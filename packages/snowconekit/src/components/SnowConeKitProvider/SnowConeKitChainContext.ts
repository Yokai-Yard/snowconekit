import { createContext, useContext, useMemo } from 'react';
import { Chain as WagmiChain } from 'wagmi';

export interface SnowConeKitChain {
  id: number;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
  rocketUrl?: string | (() => Promise<string>) | null;
}

// This type is a combination of wagmi and RainbowKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & SnowConeKitChain;

export const SnowConeKitChainContext = createContext<SnowConeKitChain[]>([]);

export const useSnowConeKitChains = () => useContext(SnowConeKitChainContext);

export const useRainbowKitChainsById = () => {
  const snowconekitChains = useSnowConeKitChains();

  return useMemo(() => {
    const snowconekitChainsById: Record<number, SnowConeKitChain> = {};

    snowconekitChains.forEach(sckChain => {
      snowconekitChainsById[sckChain.id] = sckChain;
    });

    return snowconekitChainsById;
  }, [snowconekitChains]);
};
