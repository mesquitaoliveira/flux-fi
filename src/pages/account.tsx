import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useAccount } from "wagmi";
import { Icon } from "@iconify/react";
import { PixModal } from "@/components/layout/pixModal";
import { SwapBrlToErc20Modal } from "@/components/layout/swap-brl-to-erc20";
import { useRemainingMintable } from "@/api/abi/brl-remainingMintable";

export function Account() {
  const { address } = useAccount(); // Obtém o endereço conectado
  console.log("Endereço conectado:", address);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const openPixModal = () => setShowPixModal(true);
  const closePixModal = () => setShowPixModal(false);

  const openSwapModal = () => setShowSwapModal(true);
  const closeSwapModal = () => setShowSwapModal(false);

  // Consulta o saldo restante utilizando o hook personalizado
  const { remainingMintable, isLoading } = useRemainingMintable({
    wallet: address || ""
  });

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Minha conta</h1>
      {/* Saldo em R$ */}
      <div className="text-left">
        <h1 className="text-2xl font-bold">Saldo total</h1>
        <p className="text-4xl font-extrabold text-black">
          {isLoading ? "Carregando..." : `R$ ${remainingMintable}`}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Saldo Crypto */}
        <Card>
          <CardHeader>
            <CardTitle>Saldo Crypto</CardTitle>
            <CardDescription>Total de ativos em criptomoedas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">10.5 BTC</p>
            <p className="text-gray-500">~ R$ 1.200.000,00</p>
          </CardContent>
          <CardFooter>
            <Button className="w-10 h-10 text-teal-900 border border-teal-900 bg-blue-50 hover:bg-teal-900 hover:text-white">
              <Icon icon="ic:round-qrcode" width="112" height="112" />
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2: Saldo Fiat */}
        <Card>
          <CardHeader>
            <CardTitle>Saldo Fiat</CardTitle>
            <CardDescription>
              Total disponível em moeda fiduciária
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {isLoading ? "Carregando..." : `R$ ${remainingMintable}`}
            </p>
            <p className="text-gray-500">Conta bancária</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {/* Botão de Depósito Pix */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={openPixModal}
                    className="w-10 h-10 text-teal-900 border border-teal-900 bg-blue-50 hover:bg-teal-900 hover:text-white"
                  >
                    <Icon icon="ri:pix-fill" width="112" height="112" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Depósito pix</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Novo botão para conversão */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={openSwapModal}
                    className="w-10 h-10 text-purple-900 border border-purple-900 bg-purple-50 hover:bg-purple-900 hover:text-white"
                  >
                    <Icon
                      icon="lucide-lab:coins-exchange"
                      width="96"
                      height="96"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Converter para BRL-ERC20</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>

        {/* Card 3: Empréstimos */}
        <Card>
          <CardHeader>
            <CardTitle>Empréstimos</CardTitle>
            <CardDescription>
              Valores de empréstimos em andamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">R$ 5.000,00</p>
            <p className="text-gray-500">Taxa de juros: 2% ao mês</p>
          </CardContent>
          <CardFooter>
            <p>Próximo pagamento: 15/12/2024</p>
          </CardFooter>
        </Card>
      </div>

      {/* Modais */}
      {showPixModal && <PixModal onClose={closePixModal} />}
      {showSwapModal && <SwapBrlToErc20Modal onClose={closeSwapModal} />}
    </div>
  );
}
