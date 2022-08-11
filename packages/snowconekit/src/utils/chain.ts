import { chain as wagmiChain, Chain as Chain } from 'wagmi';

const avalanche: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
    public: 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'Avalanche', url: 'https://snowtrace.io' },
  },
  testnet: false,
};

const fuji: Chain = {
  id: 43_113,
  name: 'Fuji',
  network: 'fuji',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://avalanchetestapi.terminet.io/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'Avalanche', url: 'https://testnet.snowtrace.io/' },
  },
  testnet: true,
};

export const chain = { ...wagmiChain, avalanche, fuji };
