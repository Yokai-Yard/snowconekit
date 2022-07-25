import { Chain } from '../components/SnowConeKitProvider/SnowConeKitChainContext';

export const rpcUrlsForChains = (
  chains: Chain[]
): { [chainId: number]: string } =>
  chains.reduce(
    (rpcUrlMap, chain) => ({ ...rpcUrlMap, [chain.id]: chain.rpcUrls.default }),
    {}
  );
