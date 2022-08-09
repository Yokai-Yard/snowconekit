import { chain } from 'wagmi';
import { useSnowconeKitChains } from '../components/SnowConeKitProvider/SnowConeKitChainContext';

export function useMainnet() {
  const snowConeKitChains = useSnowconeKitChains();

  const chainId = chain.mainnet.id;
  const enabled = snowConeKitChains.some(
    snowConeKitChain => snowConeKitChain.id === chainId
  );

  return { chainId, enabled };
}
