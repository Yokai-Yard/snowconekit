import React, { ReactNode, useContext, useEffect } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useMainnetEnsAvatar } from '../../hooks/useMainnetEnsAvatar';
import { useMainnetEnsName } from '../../hooks/useMainnetEnsName';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
  useModalState,
  useTransactionModal,
} from '../SnowConeKitProvider/ModalContext';
import { useSnowConeKitChainsById } from '../SnowConeKitProvider/SnowConeKitChainContext';
import { ShowRecentTransactionsContext } from '../SnowConeKitProvider/ShowRecentTransactionsContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';
import type { Transaction } from '../../transactions/transactionStore';

const noop = () => {};

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
    pendingTransactions: Transaction;
    mounted: boolean;
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
    setTx: (tx: Transaction) => void;
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
    txModalOpen: boolean;
  }) => ReactNode;
}

export function ConnectButtonRenderer({
  children,
}: ConnectButtonRendererProps) {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const ensAvatar = useMainnetEnsAvatar(address);
  const ensName = useMainnetEnsName(address);
  const { data: balanceData } = useBalance({ addressOrName: address });
  const { chain: activeChain } = useNetwork();
  const SnowConekitChainsById = useSnowConeKitChainsById();

  const pendingTransactions = useRecentTransactions().filter(
    ({ status }) => status === 'pending'
  )[0];

  const SnowConeKitChain = activeChain
    ? SnowConekitChainsById[activeChain.id]
    : undefined;
  const chainIconUrl = SnowConeKitChain?.iconUrl ?? undefined;
  const chainIconBackground = SnowConeKitChain?.iconBackground ?? undefined;

  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const hasPendingTransactions =
    useRecentTransactions().some(({ status }) => status === 'pending') &&
    showRecentTransactions;

  const displayBalance = balanceData
    ? `${abbreviateETHBalance(parseFloat(balanceData.formatted))} ${
        balanceData.symbol
      }`
    : undefined;

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { setTx } = useTransactionModal();
  const { accountModalOpen, chainModalOpen, connectModalOpen, txModalOpen } =
    useModalState();

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
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        pendingTransactions,
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
        txModalOpen,
        setTx,
        mounted,
        openAccountModal: openAccountModal ?? noop,
        openChainModal: openChainModal ?? noop,
        openConnectModal: openConnectModal ?? noop,
      })}
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
