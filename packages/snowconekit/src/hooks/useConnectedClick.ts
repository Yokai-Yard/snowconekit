import React, { useEffect } from 'react';
import { useAccount, useNetwork, Chain } from 'wagmi';
import {
  useChainModal,
  useConnectModal,
} from '../components/SnowConeKitProvider/ModalContext';

export const useConnectedClick = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const isChainSupported = !chain?.unsupported;
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  type Data = {
    address: String;
    chain: Chain & { unsupported?: boolean | undefined };
  };

  const onClick = (callback: (args: Data) => void) => {
    const runCb = ({ address, chain }: Data) => callback({ address, chain });

    return address && isConnected
      ? chain && isChainSupported
        ? () => runCb({ address, chain })
        : openChainModal && openChainModal
      : openConnectModal && openConnectModal;
  };
  return { onClick, isConnected, isChainSupported };
};
