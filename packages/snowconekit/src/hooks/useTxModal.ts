import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useBooleanState from '../hooks/useBooleanState';
import type { Transaction } from '../transactions/transactionStore';
import { useRecentTransactions } from '../transactions/useRecentTransactions';

type txModalProps = Transaction | null;

type Props = {
  pendingTransactions: Transaction;
  openTxModal: () => void;
};

type stateProps = {
  closeTxModal: () => void;
  openTxModal: () => void;
  txModalOpen: boolean;
};

const useTxModal = ({ closeTxModal, openTxModal, txModalOpen }: stateProps) => {
  const [trackedTx, setTrackedTx] = useState<txModalProps>(null);

  const transactions = useRecentTransactions();

  const findTx = (tx: txModalProps) =>
    tx && transactions.filter(({ hash }) => hash === tx?.hash)[0];

  const setTx = (transaction: Transaction) => {
    if (trackedTx) return;
    if (!trackedTx && transaction) {
      setTrackedTx(findTx(transaction));
    }
  };

  useEffect(() => {
    trackedTx && !txModalOpen && openTxModal();
  }, [trackedTx]);

  const handleonClose = () => {
    setTimeout(() => {
      closeTxModal();
      setTrackedTx(null);
    }, 700);
  };

  useEffect(() => {
    const updatedTx = findTx(trackedTx);
    trackedTx?.status !== updatedTx?.status && setTrackedTx(updatedTx);
  }, [transactions]);

  useEffect(() => {
    trackedTx && findTx(trackedTx)?.status === 'confirmed' && handleonClose();
  }, [trackedTx, transactions]);

  return { setTx, trackedTx };
};

export default useTxModal;
