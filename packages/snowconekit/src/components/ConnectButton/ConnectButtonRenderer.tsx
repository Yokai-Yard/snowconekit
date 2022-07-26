import React, { ReactNode, useCallback, useContext, useEffect } from 'react';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
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
  useSnowConeKitChains,
  useRainbowKitChainsById,
} from '../SnowConeKitProvider/SnowConeKitChainContext';
import TransactionModal from '../TransactionModal';
import { ShowRecentTransactionsContext } from '../SnowConeKitProvider/ShowRecentTransactionsContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';
import useBooleanState from '../../hooks/useBooleanState';
import type { Transaction } from '../../transactions/transactionStore';
import useTxModal from '../../hooks/useTxModal';
import TransactionAlert from '../TransactionAlert';

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
      displayRecentTransactions: boolean;
    };
    chain?: {
      hasIcon: boolean;
      iconUrl?: string;
      iconBackground?: string;
      rocketUrl?: string;
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    mounted: boolean;
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
    setTx: (tx: Transaction) => void;
    pendingTransactions: Transaction;
  }) => ReactNode;
}

export function ConnectButtonRenderer({
  children,
}: ConnectButtonRendererProps) {
  const mounted = useIsMounted();

  const { address, isConnected } = useAccount();

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
    chainId: 1,
  });

  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  const { data: balanceData } = useBalance({
    addressOrName: address,
  });

  const { chain: activeChain } = useNetwork();
  const { chains, error: networkError, switchNetwork } = useSwitchNetwork();

  const { disconnect } = useDisconnect();

  const rainbowKitChains = useSnowConeKitChains();
  const snowconekitChainsById = useRainbowKitChainsById();

  const rainbowKitChain = activeChain
    ? snowconekitChainsById[activeChain.id]
    : undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const chainIconBackground = rainbowKitChain?.iconBackground ?? undefined;
  const chainRocketUrl = rainbowKitChain?.rocketUrl ?? undefined;

  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);
  const resolvedRocketUrl = useAsyncImage(chainRocketUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);

  const pendingTransactions = useRecentTransactions().filter(
    ({ status }) => status === 'pending'
  )[0];

  const displayRecentTransactions =
    pendingTransactions && showRecentTransactions;

  const {
    setFalse: closeTxModal,
    setTrue: openTxModal,
    value: txModalOpen,
  } = useBooleanState(false);

  const { setTx, trackedTx } = useTxModal({
    closeTxModal,
    openTxModal,
    txModalOpen,
  });

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

  useEffect(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [isConnected, closeConnectModal, closeAccountModal, closeChainModal]);

  const walletConnectors = useWalletConnectors();

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map(wallet => wallet.iconUrl),
      ...rainbowKitChains.map(chain => chain.iconUrl).filter(isNotNullish),
      ...rainbowKitChains.map(chain => chain.rocketUrl).filter(isNotNullish)
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
    ? `${abbreviateETHBalance(parseFloat(balanceData.formatted))} ${
        balanceData.symbol
      }`
    : undefined;

  return (
    <>
      {children({
        account: address
          ? {
              address,
              balanceDecimals: balanceData?.decimals,
              balanceFormatted: balanceData?.formatted,
              balanceSymbol: balanceData?.symbol,
              displayBalance,
              displayName: ensName
                ? formatENS(ensName)
                : formatAddress(address),
              ensAvatar: ensAvatar ?? undefined,
              ensName: ensName ?? undefined,
              displayRecentTransactions,
            }
          : undefined,
        accountModalOpen,
        chain: activeChain
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              rocketUrl: resolvedRocketUrl,
              id: activeChain.id,
              name: activeChain.name,
              unsupported: activeChain.unsupported,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
        setTx,
        pendingTransactions,
      })}
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal
        activeChain={activeChain}
        address={address}
        balanceData={balanceData}
        chains={chains}
        ensAvatar={ensAvatar}
        ensName={ensName}
        networkError={networkError}
        open={accountModalOpen}
        onClose={closeAccountModal}
        onDisconnect={disconnect}
        onSwitchNetwork={switchNetwork}
        openChainModal={openChainModal}
      />
      <TransactionModal
        activeChain={activeChain}
        address={address}
        iconBackground={chainIconBackground}
        rocketUrl={resolvedRocketUrl}
        trackedTx={trackedTx}
        txModalOpen={txModalOpen}
        closeTxModal={closeTxModal}
      />
      <TransactionAlert address={address} trackedTx={trackedTx} />0
      <ChainModal
        activeChain={activeChain}
        chains={chains}
        networkError={networkError}
        open={chainModalOpen}
        onClose={closeChainModal}
        onDisconnect={disconnect}
        onSwitchNetwork={switchNetwork}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
