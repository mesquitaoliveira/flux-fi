import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import { BASE_URL, API_KEY, CHAVE_PIX} from "@/constants";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// Tipos para a requisição
interface GenerateQrCodeRequestBody {
  value: number; // Valor do QR Code
}

// Tipos para a resposta da API
interface QrCodeResponse {
  id: string;
  encodedImage: string; // Base64 do QR Code
  payload: string; // Código Copia e Cola (EMV)
  allowsMultiplePayments: boolean;
  expirationDate: string; // Data de expiração
  externalReference: string | null;
}

// Rota para gerar QR Code
app.post("/generate-qr-code", async (req: Request, res: Response) => {
  try {
    const { value } = req.body as GenerateQrCodeRequestBody;

    const response = await axios.post<QrCodeResponse>(
      BASE_URL,
      {
        addressKey: CHAVE_PIX,
        value,
        expirationSeconds: 180,
        allowsMultiplePayments: false,
        format: "ALL"
      },
      {
        headers: {
          access_token: API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro no proxy ao gerar QR Code:",
        error.response?.data || error.message
      );
      res
        .status(error.response?.status || 500)
        .json({ error: error.response?.data || "Erro ao gerar QR Code" });
    } else {
      console.error("Erro desconhecido:", error);
      res.status(500).json({ error: "Erro desconhecido ao gerar QR Code" });
    }
  }
});

// Inicializar o servidor
app.listen(PORT, () =>
  console.log(`Proxy rodando em http://localhost:${PORT}`)
);
