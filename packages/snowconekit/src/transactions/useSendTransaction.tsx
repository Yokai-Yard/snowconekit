import { useSendTransaction as wagmiSendTransaction } from 'wagmi';

import { useAddRecentTransaction } from './useAddRecentTransaction';

type txProps = Partial<import('@wagmi/core').SendTransactionArgs> | undefined;

export function useSendTransaction(props: txProps) {
  const addRecentTransaction = useAddRecentTransaction();

  const transaction = wagmiSendTransaction({
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: 'Transaction',
      });
    },
    ...props,
  });

  return transaction;
}
