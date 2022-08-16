import {
  chain,
  connectorsForWallets,
  getDefaultWallets,
  wallet,
} from '@snowcone/snowconekit';
import React from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

export const { chains, provider } = configureChains(
  [chain.fuji, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'SnowConeKit.com',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'More',
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.steak({ chains }),
      wallet.imToken({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Provider({ children }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
