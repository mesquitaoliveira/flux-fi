type PriceCache = {
  [key: string]: { usdPrice: string; timestamp: number };
};

/**
 * Hook para buscar preços de tokens usando um único endpoint que retorna todos os preços de uma só vez.
 */
export const useTokenPrices = () => {
  // Cache em memória para preços (chave: tokenId em lowercase)
  const cache: PriceCache = {};

  // Tempo de última atualização do cache
  let lastFetchTime = 0;

  // Intervalo de tempo, em ms, para considerar o cache válido
  const CACHE_DURATION = 15000; // 15 segundos

  /**
   * Faz a requisição do preço de todos os tokens caso o cache esteja expirado.
   */
  const fetchAllPrices = async () => {
    const now = Date.now();

    // Se ainda não expirou o cache, não faz uma nova chamada.
    if (now - lastFetchTime < CACHE_DURATION) {
      return;
    }

    try {
      const response = await fetch(
        "https://token-price-oracle.vercel.app/api/token-price?all=true"
      );
      const data = await response.json();
      console.log("Preços atualizados:", data);


      // Atualiza o cache com os dados retornados
      // Aqui assumimos que "data" tem formato conforme o exemplo:
      // {
      //   brl: { ticker: "BRL", usdPrice: "0.17", ... },
      //   usdc: { ticker: "USDC", usdPrice: "0.99", ... },
      //   ...
      // }
      Object.keys(data).forEach((key) => {
        const tokenInfo = data[key];
        cache[tokenInfo.ticker.toLowerCase()] = {
          usdPrice: tokenInfo.usdPrice,
          timestamp: now
        };
      });

      // Atualiza o horário de último fetch
      lastFetchTime = now;
    } catch (error) {
      console.error("Erro ao buscar todos os preços:", error);
      throw error;
    }
  };

  /**
   * Retorna o preço em USD de um token específico.
   */
  const getPrice = async (token: string): Promise<string> => {
    // Garante que o cache está atualizado ou recarrega se expirado
    await fetchAllPrices();

    const tokenKey = token.toLowerCase();
    if (!cache[tokenKey]) {
      throw new Error(`Token "${token}" não encontrado no cache.`);
    }

    return cache[tokenKey].usdPrice;
  };

  /**
   * Retorna a taxa de conversão de token1 para token2.
   * Ex: quantos tokens2 valem 1 token1.
   */
  const getPriceInToken = async (
    token1: string,
    token2: string
  ): Promise<string> => {
    try {
      const [price1, price2] = await Promise.all([
        getPrice(token1),
        getPrice(token2)
      ]);
      return (parseFloat(price1) / parseFloat(price2)).toFixed(8);
    } catch (error) {
      console.error("Erro ao calcular a taxa de troca:", error);
      return "0";
    }
  };

  return {
    getPriceInToken
  };
};
