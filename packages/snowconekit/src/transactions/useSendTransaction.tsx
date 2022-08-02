import { useCallback, useEffect } from 'react';
import {
  useSendTransaction as wagmiSendTransaction,
  usePrepareSendTransaction,
} from 'wagmi';

import { useAddRecentTransaction } from './useAddRecentTransaction';

type prepProps =
  | Partial<import('@wagmi/core').PrepareSendTransactionArgs>
  | undefined;

export function useSendTransaction({ ...props }: prepProps) {
  const addRecentTransaction = useAddRecentTransaction();

  const { config, error } = usePrepareSendTransaction({
    request: props,
  });

  const transaction = wagmiSendTransaction({
    ...config,
    onSettled(data, error) {
      data &&
        addRecentTransaction({
          hash: data.hash,
          description: props?.request?.description ?? '',
        });
    },
    ...props,
  });

  return transaction;
}
