import {
  useSendTransaction as wagmiSendTransaction,
  usePrepareSendTransaction,
} from 'wagmi';
import { useAddRecentTransaction } from './useAddRecentTransaction';
import {
  UseSendTransactionArgs,
  UseSendTransactionConfig,
} from 'wagmi/dist/declarations/src/hooks/transactions/useSendTransaction';

type Props = ReturnType<typeof usePrepareSendTransaction>;
type usePrepareSendTransactionResult = Props['config'];

/* export function useSendTransaction<Args extends UseSendTransactionArgs = UseSendTransactionArgs>({ ...props }: Args & UseSendTransactionConfig) {
  const addRecentTransaction = useAddRecentTransaction();
  const config = props
  const transaction = wagmiSendTransaction({
    ...props,
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  return transaction;
} */

export function useSendTransaction<PrepareSendTransactionResult>({
  chainId,
  mode,
  request,
  onError,
  onMutate,
  onSuccess,
}: PrepareSendTransactionResult &
  UseSendTransactionConfig &
  UseSendTransactionArgs) {
  const addRecentTransaction = useAddRecentTransaction();
  const transaction = wagmiSendTransaction({
    chainId,
    mode,
    request,
    onError,
    onMutate,
    onSuccess,
    onSettled(data, error) {
      data &&
        addRecentTransaction({
          hash: data.hash,
          description: request?.description ?? '',
        });
    },
  });
  return transaction;
}

/* onSettled(data, error) {
      data &&
        addRecentTransaction({
          hash: data.hash,
          description: props?.request?.description ?? '',
        });
    }, */
