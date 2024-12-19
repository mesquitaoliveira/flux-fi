import { useState, useEffect, ChangeEvent } from "react";
import { useRemainingMintable } from "@/api/abi/brl-remainingMintable";
import { useRequestMint } from "@/api/abi/useRequestMint";
import { useAccount, useWalletClient } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, SquareArrowOutUpRight, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface SwapBrlToErc20ModalProps {
  onClose: () => void;
}

const formatInputValue = (value: string): string => {
  const sanitized = value.replace(/[^0-9,]/g, "").replace(".", ",");
  const parts = sanitized.split(",");
  return parts.length > 2
    ? parts[0] + "," + parts.slice(1).join("")
    : sanitized;
};

export function SwapBrlToErc20Modal({ onClose }: SwapBrlToErc20ModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const { remainingMintable, isLoading: isLoadingRemaining } =
    useRemainingMintable({
      wallet: address ?? null
    });

  const { writeContract, error: mintError } = useRequestMint({
    amount: parseFloat(amount.replace(",", "."))
  });

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(formatInputValue(event.target.value));
    setInputError(null);
  };

  const handleConvert = async () => {
    if (!amount || !writeContract) return;

    const value = parseFloat(amount.replace(",", "."));
    const maxMintable = parseFloat(remainingMintable);

    if (value > maxMintable) {
      setInputError(`O valor excede o limite disponível: ${remainingMintable}`);
      return;
    }

    setInputError(null);
    setLoading(true);

    try {
      const txHash = await writeContract();
      setTransactionHash(txHash);
      setConversionResult(amount);
    } catch (error) {
      console.error("Erro durante o mint:", error);
      alert("Erro ao realizar a conversão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mintError) {
      console.error("Erro no mint:", mintError.message);
    }
  }, [mintError]);

  const renderConversionResult = () => (
    <div className="text-center">
      <p className="text-gray-700 font-medium mb-2 text-center">
        Conversão realizada com sucesso!
        <CircleCheck
          strokeWidth={1.5}
          className="text-teal-600 w-8 h-8 mt-2 mx-auto"
        />
      </p>
      <p className="text-lg font-bold">{conversionResult} BRL</p>
      {transactionHash && (
        <div className="text-center mt-4">
          <Button
            asChild
            variant="secondary"
            className="text-sm h-5 border border-gray-200 rounded-full"
          >
            <Link
              to={
                walletClient?.chain?.blockExplorers?.default?.url
                  ? `${walletClient.chain.blockExplorers.default.url}/tx/${transactionHash}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{`${transactionHash.slice(0, 6)}...${transactionHash.slice(
                -6
              )}`}</span>
              <SquareArrowOutUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur bg-opacity-50">
      <div className="relative rounded-lg w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Converter BRL para BRL-ERC20</CardTitle>
            <Button
              onClick={onClose}
              className="absolute top-2 w-8 h-8 right-2 bg-slate-200 text-black hover:text-white hover:bg-red-400"
            >
              <X />
            </Button>
            <CardDescription>
              {isLoadingRemaining
                ? "Carregando informações de mint disponíveis..."
                : `Limite disponível: ${remainingMintable}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!conversionResult ? (
              <div>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Valor em BRL"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring ${
                    inputError
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-teal-900"
                  }`}
                />
                {inputError && (
                  <p className="text-red-500 text-sm mt-1">{inputError}</p>
                )}
              </div>
            ) : (
              renderConversionResult()
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!conversionResult ? (
              <Button
                onClick={handleConvert}
                disabled={!amount || loading || isLoadingRemaining}
                className="px-4 py-2 bg-teal-900 text-white rounded hover:bg-teal-700 disabled:bg-gray-300"
              >
                {loading ? "Convertendo..." : "Converter"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setAmount("");
                  setConversionResult(null);
                  setTransactionHash(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Fazer nova conversão
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
