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
