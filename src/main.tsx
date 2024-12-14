import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { projectId, networks, wagmiAdapter } from "@/utils/config";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

const generalConfig = {
  projectId,
  networks
};

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  themeVariables: {
    "--w3m-color-mix": "#033035",
    "--w3m-color-mix-strength": 20,
    "--w3m-accent": "#005c66",
    "--w3m-font-size-master": "8px",
    "--w3m-border-radius-master": "1px",
  },
  features: {
    swaps: false,
    onramp: false,
    socials: ["google", "x", "farcaster"]
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
