https://api-devnet.moai-finance.xyz/pools


```js
import { Button } from "../ui/button";
import { useAccount, useDisconnect, useConnect, useBalance } from "wagmi";

export function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { data: balanceData } = useBalance();
  console.log(balanceData?.value, balanceData?.symbol);
  // Obtém apenas injector
  const appKitConnector = connectors?.[3];

  return (
    <header className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-300">
      <div className="text-lg font-bold">My Application</div>
      <nav className="flex space-x-4">
        {address ? (
          <>
            <span className="truncate max-w-[150px]" title={address}>
              {address}
              {balanceData && ` - ${balanceData.value} ${balanceData.symbol}`}
            </span>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </>
        ) : (
          <>
            {appKitConnector && (
              <Button
                key={appKitConnector.id}
                onClick={() => connect({ connector: appKitConnector })}
              >
                {appKitConnector.name || "Connect AppKit Auth"}
              </Button>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

```