### Serviço remponsável por pegar a cotação atualizada dos tokens usando oraculos de outras redes EVM
[Repositório token-price-oracle](https://github.com/mesquitaoliveira/token-price-oracle)

[`GET`](https://token-price-oracle.vercel.app/api/token-price?ticker=brl)

```js
{
  "ticker": "BRL",
  "name": "BRL Token Test",
  "decimals": 6,
  "usdPrice": "0.164312000"
}
```
[`GET`](https://token-price-oracle.vercel.app/api/token-price?ticker=wxrp)

```js
{
  "ticker": "WXRP",
  "name": "Ripple",
  "decimals": 18,
  "usdPrice": "2.177310000"
}
```

#### Inspiração - Balancer V2 e ER4626
Para um produto mínimo usamos `Curva Constante` uma forma de manter o equilíbrio e a proporcionalidade em pools de liquidez

$$\boxed{x \cdot y = k}$$

- $x$: Reservas do Token A no pool.
- $y$: Reservas do Token B no pool.
- $k$: Constante de produto, que deve permanecer inalterada em qualquer operação de swap.

Nossa fórmula de swap fica:

$$\text{amountOut} = \frac{\text{reserveOut} \cdot \text{amountInWithFee}}{\text{reserveIn} + \text{amountInWithFee}}$$

**Onde:**
- $\text{reserveIn}$: Reservas do token de entrada (token que o usuário fornece).
- $(\text{reserveOut}$: Reservas do token de saída (token que o usuário quer receber).
- $\text{amountInWithFee} = \text{amountIn} \cdot (1 - \text{fee})$: Quantidade de token de entrada após aplicar a taxa (por exemplo, 0.3%).

#### Exemplo de Swap:
- **Token A (reserveIn):** 1000 A.
- **Token B (reserveOut):** 50 B.
- **Taxa:** 0.3% (fee = 0.003).
- **amountIn (Token A):** 10 A.

**Cálculo:**
1. $\text{amountInWithFee} = 10 \cdot (1 - 0.003) = 9.97 \text{A}$.
2. Substituindo na fórmula:
   $\text{amountOut} = \frac{50 \cdot 9.97}{1000 + 9.97} \approx 0.493 \, \text{B}$

Esse cálculo garante que o $k$ do pool seja preservado após o swap.
#### OBs.: A contexto de simplificação usamos todos os tokens com 18 casa decimais, se os decimais forem diferentes a fómula precisa ser ajustada para garantir a precisão.

[Repositório Smart Contract - Call](https://github.com/mesquitaoliveira/fluxfi-smart-contract-call)
Responsabilidade:
- `Swap`
- `Criar Pool de liquidez`: usar 50/50 WEIGHT pode ser mais fácil para realizar os cálculos, porém aceita proporções diferentes
- `Adicionar Liquidez`
- `Remover liquidez`

Swap exemplo:
```bash
Amount In: 123000000000000000
Token In Address: 0xFB3f9101C7cB845958b7649ab1d52F2a30ca4294
Token Out Address: 0x22e7163f6ED77D7ff19608392f06fdB4b12A0686
User Token In Balance: 123294236197424440053
Allowance: 0
Aprovando o Vault para gastar tokens...
Aprovação realizada com sucesso.
Registered Pool Address: 0xa96a5ed31f4020E6dd5784d1C32f44e7F3d736F5
Executando swap...
Swap executado com sucesso.
```

[TX Hash](https://explorer.xrplevm.org/tx/0xba71c983dcae93818805eb3c88f204c68fa52d4378dc1dcb94ab5a5c7594117f)
