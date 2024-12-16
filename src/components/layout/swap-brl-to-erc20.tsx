import { useState, useEffect } from "react";
import { useRemainingMintable } from "@/api/abi/brl-remainingMintable";
import { useRequestMint } from "@/api/abi/useRequestMint";
import { useAccount } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SwapBrlToErc20ModalProps {
  onClose: () => void;
}

export function SwapBrlToErc20Modal({ onClose }: SwapBrlToErc20ModalProps) {
  const [amount, setAmount] = useState("");
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  // Hook para verificar o máximo mintável
  const { remainingMintable, isLoading: isLoadingRemaining } =
    useRemainingMintable({ wallet: address ?? null });

  // Hook para executar o mint
  const { writeContract, error: mintError } = useRequestMint({
    amount: parseFloat(amount.replace(",", "."))
  });

  // Função para converter/mintar
  const handleConvert = async () => {
    if (!amount || !writeContract) return;

    const value = parseFloat(amount.replace(",", "."));
    const maxMintable = parseFloat(remainingMintable);

    if (value > maxMintable) {
      alert(`O valor excede o limite máximo de mint: ${remainingMintable}`);
      return;
    }

    try {
      setLoading(true);
      await writeContract(); // Executa o mint
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
                : `Limite máximo de mint: ${remainingMintable}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!conversionResult ? (
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  let value = e.target.value
                    .replace(/[^0-9,]/g, "")
                    .replace(".", ",");
                  const parts = value.split(",");
                  if (parts.length > 2) {
                    value = parts[0] + "," + parts.slice(1).join("");
                  }
                  setAmount(value);
                }}
                placeholder="Valor em BRL"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-teal-900"
              />
            ) : (
              <div className="text-center">
                <p className="text-gray-700 font-medium mb-2">
                  Conversão realizada com sucesso!
                </p>
                <p className="text-lg font-bold">{conversionResult} BRL</p>
              </div>
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
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Fazer nova conversão
              </Button>
            )}
            <Button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Fechar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
