import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import tokenList from "./token-list.json";
import { formatInputValue } from "@/utils/validate-input/input-swap";
import { useBalance, useAccount } from "wagmi";
import { formatUnits } from "viem";

interface Token {
  img: string;
  name: string;
  ticker: string;
  address: string;
  decimals: number;
}

interface TokenSelectorProps {
  token: Token | null;
  onClick: () => void;
}

const TokenSelector = ({ token, onClick }: TokenSelectorProps) => (
  <div
    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
    onClick={onClick}
  >
    {token ? (
      <>
        <img src={token.img} alt="" className="w-6 h-6 rounded-full" />
        <div className="flex flex-col">
          <span className="text-sm text-black">{token.name}</span>
          <span className="text-sm text-black">{token.ticker}</span>
        </div>
      </>
    ) : (
      <span className="text-sm text-black">Selecione</span>
    )}
  </div>
);

interface TokenInputProps {
  token: Token | null;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wallet: string | null;
}

const TokenInput = ({
  token,
  onClick,
  value,
  onChange,
  wallet
}: TokenInputProps) => {
  const getTokenBalance = (tokenAddress: string | undefined) => {
    if (!wallet || !tokenAddress) return "0";

    const {
      data: balanceData,
      isError,
      isLoading
    } = useBalance({
      address: wallet as `0x${string}`,
      token: tokenAddress as `0x${string}`
    });

    if (isLoading) {
      return "Carregando...";
    }
    if (isError) {
      return "Erro ao carregar";
    }
    return balanceData
      ? `${parseFloat(
          formatUnits(balanceData.value, balanceData.decimals)
        ).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 18
        })}`
      : "0";
  };

  const balance = token ? getTokenBalance(token.address) : "0";

  return (
    <div className="flex justify-between gap-2 p-2 bg-gray-200 rounded-lg">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="0,00"
        className="w-full h-19 border-none text-left text-lg text-black"
      />
      <div className="flex-col items-center justify-between gap-4">
        <p className="text-sm text-gray-500 text-right pb-1">
          Balance: {balance}
        </p>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-full"
            onClick={onClick}
          >
            {token ? (
              <>
                <img src={token.img} alt="" className="w-6 h-6 rounded-full" />
                <span className="text-black">{token.ticker}</span>
                <ChevronDown size={"20"} className="text-black" />
              </>
            ) : (
              <>
                <span className="text-black">Selecione</span>
                <ChevronDown size={"20"} className="text-black" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Buy() {
  const { address } = useAccount(); // Obtém o endereço da wallet conectada
  const wallet = address ?? null; // Define wallet como null se não houver conexão

  const [tokenOne, setTokenOne] = useState<Token | null>(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState<Token | null>(tokenList[1]);
  const [valueOne, setValueOne] = useState<string>("");
  const [valueTwo, setValueTwo] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);

  const openModal = (tokenNumber: number) => {
    setChangeToken(tokenNumber);
    setIsOpen(true);
  };

  const handleTokenSelect = (token: Token) => {
    if (changeToken === 1) {
      if (tokenTwo && token.ticker === tokenTwo.ticker) {
        setTokenOne(null);
      } else {
        setTokenOne(token);
      }
    } else {
      if (tokenOne && token.ticker === tokenOne.ticker) {
        setTokenTwo(null);
      } else {
        setTokenTwo(token);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="absolute top-2/3 left-[57%] sm:max-w-[400px] sm:max-h-[500px] bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center">
              Selecione um token
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col gap-2">
              {tokenList.map((token, i) => (
                <TokenSelector
                  key={i}
                  token={token}
                  onClick={() => handleTokenSelect(token)}
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Card className="relative w-[400px]  text-white">
        <CardHeader className="flex justify-between">
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TokenInput
            token={tokenOne}
            onClick={() => openModal(1)}
            value={valueOne}
            onChange={(e) => setValueOne(formatInputValue(e.target.value))}
            wallet={wallet}
          />
          <TokenInput
            token={tokenTwo}
            onClick={() => openModal(2)}
            value={valueTwo}
            onChange={(e) => setValueTwo(formatInputValue(e.target.value))}
            wallet={wallet}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-teal-800 text-white hover:bg-teal-700">
            Connect Wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
