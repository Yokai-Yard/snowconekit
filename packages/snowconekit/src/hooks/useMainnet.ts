import { chain } from 'wagmi';
import { useSnowConeKitChains } from '../components/snowConeKitProvider/SnowConeKitChainContext';

export function useMainnet() {
  const snowConeKitChains = useSnowConeKitChains();

  const chainId = chain.mainnet.id;
  const enabled = snowConeKitChains.some(
    snowConeKitChain => snowConeKitChain.id === chainId
  );

  return { chainId, enabled };
}
