import { useState, useEffect } from "react";
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
import { useBalance, useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { formatUnits } from "viem";
import { useTokenPrices } from "@/api/abi/token-price";

interface Token {
  img: string;
  name: string;
  ticker: string;
  address: string;
  decimals: number;
}

const TokenSelector = (props: {
  token: Token;
  onClick: () => void;
  disabled: boolean;
}) => (
  <div
    className={`flex items-center gap-2 p-2 rounded-md ${
      props.disabled
        ? "bg-gray-300 cursor-not-allowed opacity-50"
        : "cursor-pointer hover:bg-gray-100"
    }`}
    onClick={!props.disabled ? props.onClick : undefined}
  >
    <img src={props.token.img} alt="" className="w-6 h-6 rounded-full" />
    <div className="flex flex-col">
      <span className="text-sm text-black">{props.token.name}</span>
      <span className="text-sm text-black">{props.token.ticker}</span>
    </div>
  </div>
);

const TokenInput = (props: {
  token: Token | null;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wallet: string | null;
  isLoading?: boolean;
}) => {
  const getTokenBalance = (tokenAddress: string | undefined) => {
    if (!props.wallet || !tokenAddress) return "0";

    const {
      data: balanceData,
      isError,
      isLoading
    } = useBalance({
      address: props.wallet as `0x${string}`,
      token: tokenAddress as `0x${string}`
    });

    if (isLoading) return "Carregando...";
    if (isError) return "Erro ao carregar";
    return balanceData
      ? `${parseFloat(
          formatUnits(balanceData.value, balanceData.decimals)
        ).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 18
        })}`
      : "0";
  };

  const balance = props.token ? getTokenBalance(props.token.address) : "0";

  return (
    <div className="flex justify-between gap-2 p-2 bg-gray-200 rounded-lg">
      <Input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="0,00"
        className={`w-full h-19 border-none text-left text-lg text-black ${
          props.isLoading ? "animate-pulse text-gray-400" : ""
        }`}
        readOnly={!props.onChange}
      />
      <div className="flex-col items-center justify-between gap-4">
        <p className="text-sm text-gray-500 text-right pb-1">
          Balance: {balance}
        </p>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-full"
            onClick={props.onClick}
          >
            {props.token ? (
              <>
                <img
                  src={props.token.img}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-black">{props.token.ticker}</span>
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
  const { address } = useAccount();
  const { connect } = useConnect();
  
  const wallet = address ?? null;

  const [tokenOne, setTokenOne] = useState<Token | null>(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState<Token | null>(tokenList[1]);
  const [valueOne, setValueOne] = useState<string>("0");
  const [valueTwo, setValueTwo] = useState<string>("0");

  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { getPriceInToken } = useTokenPrices();

  const openModal = (tokenNumber: number) => {
    setChangeToken(tokenNumber);
    setIsOpen(true);
  };

  const handleTokenSelect = (token: Token) => {
    if (changeToken === 1 && token.address === tokenTwo?.address) return;
    if (changeToken === 2 && token.address === tokenOne?.address) return;

    if (changeToken === 1) setTokenOne(token);
    else setTokenTwo(token);

    setIsOpen(false);
  };

  useEffect(() => {
    const fetchConversionRate = async () => {
      if (tokenOne && tokenTwo && parseFloat(valueOne) > 0) {
        setIsLoading(true);
        const price = await getPriceInToken(tokenOne.ticker, tokenTwo.ticker);
        setValueTwo(
          (parseFloat(valueOne) * parseFloat(price))
            .toFixed(8)
            .replace(".", ",")
        );
        setIsLoading(false);
      }
    };

    fetchConversionRate();
  }, [tokenOne, tokenTwo, valueOne, getPriceInToken]);

  return (
    <div className="relative flex justify-center items-center pt-4">
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
                  disabled={
                    (changeToken === 1 &&
                      token.address === tokenTwo?.address) ||
                    (changeToken === 2 && token.address === tokenOne?.address)
                  }
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Card className="relative w-[400px] text-black">
        <CardHeader className="flex justify-between">
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TokenInput
            token={tokenOne}
            onClick={() => openModal(1)}
            value={valueOne}
            onChange={(e) => {
              const rawValue = e.target.value;
              const formattedValue = formatInputValue(rawValue);
              setValueOne(formattedValue);
            }}
            wallet={wallet}
          />
          <TokenInput
            token={tokenTwo}
            onClick={() => openModal(2)}
            value={valueTwo}
            wallet={wallet}
            isLoading={isLoading}
            onChange={() => {}}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-teal-800 text-white hover:bg-teal-700"
            onClick={!wallet ? () => connect({ connector: injected() }) : undefined}
          >
            {wallet ? "Swap" : "Connect Wallet"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
