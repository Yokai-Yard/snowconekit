import { useSendTransaction as wagmiSendTransaction } from 'wagmi';

import { useAddRecentTransaction } from './useAddRecentTransaction';

//declare a type with the same shape as wagmiSendTransaction's input type
type txProps = typeof wagmiSendTransaction;

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
