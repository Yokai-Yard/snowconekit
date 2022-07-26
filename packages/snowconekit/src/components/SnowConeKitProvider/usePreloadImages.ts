import { useCallback, useEffect } from 'react';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { preloadAssetsIcon } from '../Icons/Assets';
import { preloadLoginIcon } from '../Icons/Login';
import { useSnowConeKitChains } from './SnowConeKitChainContext';

export function usePreloadImages() {
  const snowconeKitChains = useSnowConeKitChains();
  const walletConnectors = useWalletConnectors();

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map(wallet => wallet.iconUrl),
      ...snowconeKitChains.map(chain => chain.iconUrl).filter(isNotNullish),
      ...snowconeKitChains.map(chain => chain.rocketUrl).filter(isNotNullish)
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
  }, [walletConnectors, snowconeKitChains]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);
}
