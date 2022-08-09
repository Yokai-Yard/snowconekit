import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Chain as WagmiChain } from 'wagmi';
import { provideSnowconeKitChains } from './provideSnowConeKitChains';

export interface SnowconeKitChain {
  id: number;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
  rocketUrl?: string | (() => Promise<string>) | null;
}

// This type is a combination of wagmi and SnowconeKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & SnowconeKitChain;

interface SnowconeKitChainContextValue {
  chains: SnowconeKitChain[];
  initialChainId?: number;
}

const SnowconeKitChainContext = createContext<SnowconeKitChainContextValue>({
  chains: [],
});

interface SnowconeKitChainProviderProps {
  chains: SnowconeKitChain[];
  initialChain?: SnowconeKitChain | number;
  children: ReactNode;
}

export function SnowconeKitChainProvider({
  chains,
  children,
  initialChain,
}: SnowconeKitChainProviderProps) {
  return (
    <SnowconeKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideSnowconeKitChains(chains),
          initialChainId:
            typeof initialChain === 'number'
              ? initialChain
              : initialChain?.id ?? chains[0]?.id,
        }),
        [chains, initialChain]
      )}
    >
      {children}
    </SnowconeKitChainContext.Provider>
  );
}

export const useSnowconeKitChains = () =>
  useContext(SnowconeKitChainContext).chains;

export const useInitialChainId = () =>
  useContext(SnowconeKitChainContext).initialChainId;

export const useSnowConeKitChainsById = () => {
  const SnowconeKitChains = useSnowconeKitChains();

  return useMemo(() => {
    const SnowconeKitChainsById: Record<number, SnowconeKitChain> = {};

    SnowconeKitChains.forEach(rkChain => {
      SnowconeKitChainsById[rkChain.id] = rkChain;
    });

    return SnowconeKitChainsById;
  }, [SnowconeKitChains]);
};
