import { useState } from "react";
import { generateQrCode } from "@/api/index";
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

interface PixModalProps {
  onClose: () => void;
}

interface StepOneProps {
  depositValue: string;
  setDepositValue: (value: string) => void;
  handleNextStep: () => void;
  onClose: () => void;
}

interface StepTwoProps {
  qrCodeData: { image: string; payload: string };
  handleBackStep: () => void;
  onClose: () => void;
}

// Passo 1: Entrada do valor
const StepOne = ({
  depositValue,
  setDepositValue,
  handleNextStep,
  onClose
}: StepOneProps) => (
  <>
    <CardHeader>
      <CardTitle>Passo 1: Depósito</CardTitle>
      <Button
        onClick={onClose}
        className="absolute top-2 w-8 h-8 right-2 bg-slate-200 text-black hover:text-white hover:bg-red-400"
      >
        <X />
      </Button>
      <CardDescription>Digite o valor do depósito:</CardDescription>
    </CardHeader>
    <CardContent>
      <input
        type="text"
        value={depositValue}
        onChange={(e) => {
          let value = e.target.value.replace(/[^0-9,]/g, "").replace(".", ",");
          const parts = value.split(",");
          if (parts.length > 2) {
            value = parts[0] + "," + parts.slice(1).join("");
          }
          setDepositValue(value);
        }}
        placeholder="Valor"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-teal-900"
      />
    </CardContent>
    <CardFooter>
      <Button
        onClick={handleNextStep}
        disabled={!depositValue}
        className="px-4 py-2 bg-teal-900 text-white rounded hover:bg-teal-700 disabled:bg-gray-300"
      >
        Próximo
      </Button>
    </CardFooter>
  </>
);

// Passo 2: QR Code gerado
const StepTwo = ({ qrCodeData, handleBackStep, onClose }: StepTwoProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCodeData.payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>
          Passo 2: QR Code
          <Button
            onClick={onClose}
            className="absolute top-2 w-8 h-8 right-2 bg-slate-200 text-black hover:text-white hover:bg-red-400"
          >
            <X />
          </Button>
        </CardTitle>
        <CardDescription>
          Use o QR code abaixo para realizar o pagamento:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
          <img
            src={`data:image/png;base64,${qrCodeData.image}`}
            alt="QR Code"
            className="w-32 h-32"
          />
        </div>
        <div className="mt-4">
          <p className="text-center text-gray-700 font-medium mb-2">
            Copie o código PIX para pagamento:
          </p>
          <div className="flex items-center justify-between border rounded p-2 bg-gray-100">
            <span className="text-sm truncate">{qrCodeData.payload}</span>
            <Button
              onClick={copyToClipboard}
              className="bg-teal-900 text-white px-4 py-1 rounded hover:bg-teal-700"
            >
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleBackStep}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Voltar
        </Button>
      </CardFooter>
    </>
  );
};

// Modal Principal
export function PixModal({ onClose }: PixModalProps) {
  const [step, setStep] = useState(1);
  const [depositValue, setDepositValue] = useState("");
  const [qrCodeData, setQrCodeData] = useState<{
    image: string;
    payload: string;
  } | null>(null);

  const handleNextStep = async () => {
    if (depositValue.trim() !== "") {
      try {
        const value = parseFloat(depositValue.replace(",", "."));
        const response = await generateQrCode(value);
        setQrCodeData({
          image: response.encodedImage,
          payload: response.payload
        });
        setStep(2);
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      }
    }
  };

  const handleBackStep = () => {
    setStep(1);
    setQrCodeData(null);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur bg-opacity-50 space-y-0">
      <div className="relative rounded-lg w-full max-w-md mx-auto">
        <Card>
          {step === 1 ? (
            <StepOne
              depositValue={depositValue}
              setDepositValue={setDepositValue}
              handleNextStep={handleNextStep}
              onClose={onClose}
            />
          ) : (
            qrCodeData && (
              <StepTwo
                qrCodeData={qrCodeData}
                handleBackStep={handleBackStep}
                onClose={onClose}
              />
            )
          )}
        </Card>
      </div>
    </div>
  );
}
