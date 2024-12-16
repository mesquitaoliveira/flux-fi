import { useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { brlErc20Abi } from "@/utils/abi/brl-er20";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

interface UseRequestMintParams {
  amount: number; // Valor a ser mintado
}

interface UseRequestMintResponse {
  writeContract: (() => Promise<void>) | null; // Função para chamar o contrato
  error: Error | null; // Detalhes do erro (se houver)
}

export function useRequestMint({
  amount
}: UseRequestMintParams): UseRequestMintResponse {
  const { data: walletClient } = useWalletClient();

  const writeContract = walletClient
    ? async () => {
        try {
          await walletClient.writeContract({
            abi: brlErc20Abi,
            address: contractAddress,
            functionName: "requestMint",
            args: [parseUnits(amount.toString(), 6)] // Converte para 6 decimais
          });
          console.log("Mint realizado com sucesso!");
        } catch (error) {
          console.error("Erro ao executar mint:", error);
          throw error; // Propaga o erro para quem chamou a função
        }
      }
    : null;

  return {
    writeContract,
    error: walletClient ? null : new Error("Wallet client não está disponível")
  };
}
