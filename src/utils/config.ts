import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { AppKitNetwork } from "@reown/appkit/networks";
import {xrpEvmSidechain} from "@/utils/xrpEvmSidechain";

export const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}


export const networks = [ xrpEvmSidechain] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;
