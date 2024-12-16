import { useReadContract } from "wagmi";
import { brlErc20Abi } from "@/utils/abi/brl-er20";
import { formatUnits } from "viem";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

interface UseRemainingMintableParams {
  wallet: string | null; // Permitir null para tratar wallet desconectada
}

interface RemainingMintableResponse {
  wallet: string | null;
  remainingMintable: string;
  isLoading: boolean;
}

export function useRemainingMintable({
  wallet
}: UseRemainingMintableParams): RemainingMintableResponse {
  // Condição para evitar consulta se a wallet for null
  const shouldFetch = !!wallet;

  // Consulta ao contrato
  const { data, isLoading } = useReadContract({
    address: shouldFetch ? contractAddress : undefined,
    abi: shouldFetch ? brlErc20Abi : undefined,
    functionName: shouldFetch ? "remainingMintable" : undefined,
    args: shouldFetch ? [wallet] : undefined
  });

  // Formata o valor retornado pelo contrato ou usa 0.00 como fallback
  const remainingMintable = formatRemainingMintable(data);

  return {
    wallet,
    remainingMintable,
    isLoading
  };
}

function formatRemainingMintable(data: unknown): string {
  return typeof data === "bigint" ? formatUnits(data, 6) : "0.00";
}
