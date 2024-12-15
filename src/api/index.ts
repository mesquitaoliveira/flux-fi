import axios from "axios";
import { BASE_URL } from "@/constants";
interface QrCodeResponse {
  id: string;
  encodedImage: string;
  payload: string;
  allowsMultiplePayments: boolean;
  expirationDate: string;
  externalReference: string | null;
}

export const generateQrCode = async (
  value: number
): Promise<QrCodeResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/generate-qr-code`, {
      value
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    throw error;
  }
};
