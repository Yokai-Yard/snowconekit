import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { AccountModal } from '../AccountModal/AccountModal';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import TransactionModal from '../TransactionModal';
import useTxModal from '../../hooks/useTxModal';
import type { Transaction } from '../../transactions/transactionStore';

function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
  };
}

interface ModalContextValue {
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  txModalOpen: boolean;
  openAccountModal?: () => void;
  openChainModal?: () => void;
  openConnectModal?: () => void;
  trackedTx?: Transaction | null;
}

const ModalContext = createContext<ModalContextValue>({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false,
  txModalOpen: false,
});

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const {
    closeModal: closeConnectModal,
    isModalOpen: connectModalOpen,
    openModal: openConnectModal,
  } = useModalStateValue();

  const {
    closeModal: closeAccountModal,
    isModalOpen: accountModalOpen,
    openModal: openAccountModal,
  } = useModalStateValue();

  const {
    closeModal: closeChainModal,
    isModalOpen: chainModalOpen,
    openModal: openChainModal,
  } = useModalStateValue();

  const {
    closeModal: closeTxModal,
    isModalOpen: txModalOpen,
    openModal: openTxModal,
  } = useModalStateValue();

  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const isChainSupported = !chain?.unsupported;

  const { trackedTx } = useTxModal({
    closeTxModal,
    openTxModal,
    txModalOpen,
  });

  useEffect(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [isConnected, closeConnectModal, closeAccountModal, closeChainModal]);

  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          ...(isConnected
            ? {
                ...(isChainSupported ? { openAccountModal } : {}),
                openChainModal,
              }
            : { openConnectModal }),
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          txModalOpen,
          trackedTx,
        }),
        [
          isChainSupported,
          isConnected,
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          openAccountModal,
          openChainModal,
          openConnectModal,
        ]
      )}
    >
      {children}
      <TransactionModal
        trackedTx={trackedTx}
        txModalOpen={txModalOpen}
        closeTxModal={closeTxModal}
      />
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal onClose={closeAccountModal} open={accountModalOpen} />
      <ChainModal onClose={closeChainModal} open={chainModalOpen} />
    </ModalContext.Provider>
  );
}

export function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen, txModalOpen } =
    useContext(ModalContext);

  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen,
    txModalOpen,
  };
}

export function useAccountModal() {
  const { openAccountModal } = useContext(ModalContext);
  return { openAccountModal };
}

export function useChainModal() {
  const { openChainModal } = useContext(ModalContext);
  return { openChainModal };
}

export function useConnectModal() {
  const { openConnectModal } = useContext(ModalContext);
  return { openConnectModal };
}
export function useTrackedTx() {
  const { trackedTx } = useContext(ModalContext);
  return { trackedTx };
}
