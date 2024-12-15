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

import { QrCode, Banknote } from "lucide-react";
import { PixModal } from "@/components/layout/pixModal"; // Certifique-se do caminho correto

export function Account() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Minha conta</h1>
      {/* Saldo em R$ */}
      <div className="text-left">
        <h1 className="text-2xl font-bold">Saldo total</h1>
        <p className="text-4xl font-extrabold text-black">R$ 10.000,00</p>
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
              <QrCode />
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
            <p className="text-2xl font-semibold">R$ 50.000,00</p>
            <p className="text-gray-500">Conta bancária</p>
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={openModal}
                    className="w-10 h-10 text-teal-900 border border-teal-900 bg-blue-50 hover:bg-teal-900 hover:text-white"
                  >
                    <Banknote />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Depósito pix</p>
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

      {/* Modal */}
      {showModal && (
          <PixModal onClose={closeModal} />
      )}
    </div>
  );
}
