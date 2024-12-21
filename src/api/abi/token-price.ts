type PriceCache = {
  [key: string]: { usdPrice: string; timestamp: number };
};

export const useTokenPrices = () => {
  const cache: PriceCache = {}; // Cache em memória para preços

  const fetchPrice = async (token: string): Promise<string> => {
    // Use cache se o preço tiver sido buscado recentemente (ex: últimos 60 segundos)
    const now = Date.now();
    if (cache[token] && now - cache[token].timestamp < 60000) {
      return cache[token].usdPrice;
    }

    try {
      const response = await fetch(
        `https://token-price-oracle.vercel.app/api/token-price?ticker=${token}`
      );
      const data = await response.json();
      if (!data || !data.usdPrice) {
        throw new Error("Resposta inválida da API");
      }

      // Armazena no cache
      cache[token] = { usdPrice: data.usdPrice, timestamp: now };
      return data.usdPrice;
    } catch (error) {
      console.error(`Erro ao buscar preço para o token ${token}:`, error);
      throw error;
    }
  };

  const getPriceInToken = async (
    token1: string,
    token2: string
  ): Promise<string> => {
    try {
      // Requisições em paralelo
      const [token1Price, token2Price] = await Promise.all([
        fetchPrice(token1),
        fetchPrice(token2)
      ]);

      // Calcula a taxa de troca
      return (parseFloat(token1Price) / parseFloat(token2Price)).toFixed(8);
    } catch (error) {
      console.error("Erro ao calcular a taxa de troca:", error);
      return "0";
    }
  };

  return { getPriceInToken };
};
