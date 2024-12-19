import { useState, useCallback } from "react";
import { useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { brlErc20Abi } from "@/utils/abi/brl-er20";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

interface UseRequestMintParams {
  amount: number; // Valor a ser mintado
}

interface UseRequestMintResponse {
  writeContract: (() => Promise<string | null>) | null; // Retorna o hash da transação
  isLoading: boolean; // Indica se o processo está em andamento
  error: Error | null; // Detalhes do erro (se houver)
}

export function useRequestMint({
  amount
}: UseRequestMintParams): UseRequestMintResponse {
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const writeContract = useCallback(async (): Promise<string | null> => {
    if (!walletClient) {
      const error = new Error("Wallet client não está disponível");
      setError(error);
      throw error;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Enviar transação e obter o hash
      const txHash: string = await walletClient.writeContract({
        abi: brlErc20Abi,
        address: contractAddress,
        functionName: "requestMint",
        args: [parseUnits(amount.toString(), 6)] // Converte para 6 decimais
      });

      console.log("Mint enviado. Hash da transação:", txHash);

      // Espera de 10 segundos antes de retornar o hash
      await new Promise((resolve) => setTimeout(resolve, 10000));

      return txHash; // Retorna o hash da transação
    } catch (err) {
      console.error("Erro ao executar mint:", err);
      setError(err as Error);
      throw err; // Propaga o erro para o chamador
    } finally {
      setIsLoading(false);
    }
  }, [amount, walletClient]);

  return {
    writeContract: walletClient ? writeContract : null,
    isLoading,
    error
  };
}