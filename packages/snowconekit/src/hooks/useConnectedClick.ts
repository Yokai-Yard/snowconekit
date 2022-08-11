import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import {
  useChainModal,
  useConnectModal,
} from '../components/SnowConeKitProvider/ModalContext';

export const useConnectedClick = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const isChainSupported = !chain?.unsupported;
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const onClick = (callback: () => void) =>
    isConnected
      ? isChainSupported
        ? callback
        : openChainModal && openChainModal
      : openConnectModal && openConnectModal;

  return { onClick, isConnected, isChainSupported };
};
