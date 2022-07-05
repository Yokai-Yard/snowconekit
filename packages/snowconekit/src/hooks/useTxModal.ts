import React, { useState, useEffect } from 'react';
import useBooleanState from '../hooks/useBooleanState';
import type { Transaction } from '../transactions/transactionStore';
import { useRecentTransactions } from '../transactions/useRecentTransactions';

type txModalProps = Transaction | null;

const useTxModal = () => {
  const [tx, setTx] = React.useState<txModalProps>(null);
  const trackedTx = useRecentTransactions().filter(
    ({ hash }) => hash === tx?.hash
  )[0];

  const {
    setFalse: onClose,
    setTrue: openTxModal,
    value: open,
  } = useBooleanState(false);

  useEffect(() => {
    trackedTx?.status === 'pending' && openTxModal();
  }, [tx]);

  useEffect(() => {
    console.log(trackedTx);
  }, [trackedTx]);

  const txProps = { trackedTx, open, onClose };

  return { setTx, txProps };
};

export default useTxModal;
