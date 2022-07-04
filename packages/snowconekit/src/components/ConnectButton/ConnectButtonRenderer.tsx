import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useIsMounted } from '../../hooks/useIsMounted';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { AccountModal } from '../AccountModal/AccountModal';
import { loadImages, useAsyncImage } from '../AsyncImage/useAsyncImage';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { preloadAssetsIcon } from '../Icons/Assets';
import { preloadLoginIcon } from '../Icons/Login';
import {
  useRainbowKitChains,
  useRainbowKitChainsById,
} from '../RainbowKitProvider/RainbowKitChainContext';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';
import TransactionModal from '../TransactionModal/index';
import { useClearRecentTransactions } from '../../transactions/useClearRecentTransactions';

const useBooleanState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { setFalse, setTrue, value };
};

export interface ConnectButtonRendererProps {
  children: (renderProps: {
    account?: {
      address: string;
      balanceDecimals?: number;
      balanceFormatted?: string;
      balanceSymbol?: string;
      displayBalance?: string;
      displayName: string;
      ensAvatar?: string;
      ensName?: string;
      hasPendingTransactions: boolean;
    };
    chain?: {
      hasIcon: boolean;
      iconUrl?: string;
      iconBackground?: string;
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    mounted: boolean;
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
    openTransactionModal: () => void;
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
    transactionModalOpen: boolean;
  }) => ReactNode;
}

export function ConnectButtonRenderer({
  children,
}: ConnectButtonRendererProps) {
  const mounted = useIsMounted();

  const { data: accountData } = useAccount();

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: accountData?.address,
  });

  const { data: ensName } = useEnsName({ address: accountData?.address });

  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
  });

  const {
    activeChain,
    chains,
    error: networkError,
    switchNetwork,
  } = useNetwork();

  const clearRecentTransactions = useClearRecentTransactions();

  const { disconnect } = useDisconnect();

  const rainbowKitChains = useRainbowKitChains();
  const rainbowkitChainsById = useRainbowKitChainsById();

  const rainbowKitChain = activeChain
    ? rainbowkitChainsById[activeChain.id]
    : undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const chainIconBackground = rainbowKitChain?.iconBackground ?? undefined;

  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const pendingTransactions = useRecentTransactions().filter(
    ({ status }) => status === 'pending'
  );

  const hasPendingTransactions =
    useRecentTransactions().some(({ status }) => status === 'pending') &&
    showRecentTransactions;

  const {
    setFalse: closeConnectModal,
    setTrue: openConnectModal,
    value: connectModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: closeAccountModal,
    setTrue: openAccountModal,
    value: accountModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: closeChainModal,
    setTrue: openChainModal,
    value: chainModalOpen,
  } = useBooleanState(false);

  const hasAccountData = Boolean(accountData);
  useEffect(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [hasAccountData, closeConnectModal, closeAccountModal, closeChainModal]);

  const walletConnectors = useWalletConnectors();

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map(wallet => wallet.iconUrl),
      ...rainbowKitChains.map(chain => chain.iconUrl).filter(isNotNullish),
      '/images/Web3ModaleHeader.svg'
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
  }, [walletConnectors, rainbowKitChains]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const displayBalance = balanceData
    ? `${Number(balanceData.formatted).toPrecision(3)} ${balanceData.symbol}`
    : undefined;

  // ---------------------------------------------------------------

  const transaction = useRecentTransactions();
  const [transactionStatus, setTransactionStatus] = useState('');

  const {
    setFalse: closeTransactionModal,
    setTrue: openTransactionModal,
    value: transactionModalOpen,
  } = useBooleanState(false);

  const closeModalAfter2Seconds = () => {
    setTimeout(() => {
      closeTransactionModal();
    }, 2000);
  };

  useEffect(() => {
    hasPendingTransactions && openTransactionModal();

    transaction[0]?.status === 'confirmed' && closeModalAfter2Seconds();
    transaction[0]?.status === 'failed' && closeModalAfter2Seconds();
  }, [transaction, hasPendingTransactions]);

  useEffect(() => {
    transaction[0]?.status &&
      transaction[0].status === 'pending' &&
      setTransactionStatus('pending');
    transaction[0]?.status &&
      transaction[0].status === 'confirmed' &&
      setTransactionStatus('confirmed');
    transaction[0]?.status &&
      transaction[0].status === 'failed' &&
      setTransactionStatus('failed');
  }, [transaction]);

  // -----------------------------------------------------------------

  return (
    <>
      {children({
        account: accountData?.address
          ? {
              address: accountData.address,
              balanceDecimals: balanceData?.decimals,
              balanceFormatted: balanceData?.formatted,
              balanceSymbol: balanceData?.symbol,
              displayBalance,
              displayName: ensName
                ? formatENS(ensName)
                : formatAddress(accountData.address),
              ensAvatar: ensAvatar ?? undefined,
              ensName: ensName ?? undefined,
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        chain: activeChain
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              id: activeChain.id,
              name: activeChain.name,
              unsupported: activeChain.unsupported,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        transactionModalOpen,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
        openTransactionModal,
      })}

      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal
        accountData={accountData}
        balanceData={balanceData}
        ensAvatar={ensAvatar}
        ensName={ensName}
        onClose={closeAccountModal}
        onDisconnect={disconnect}
        open={accountModalOpen}
        activeChain={activeChain}
        chains={chains}
        networkError={networkError}
        onSwitchNetwork={switchNetwork}
      />
      <TransactionModal
        transactionStatus={transactionStatus}
        onClose={closeTransactionModal}
        onDisconnect={disconnect}
        open={transactionModalOpen}
      />
      <ChainModal
        activeChain={activeChain}
        chains={chains}
        networkError={networkError}
        onClose={closeChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
