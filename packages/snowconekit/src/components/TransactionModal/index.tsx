import React from 'react';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from '../Dialog/TxDialogContent';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { PushSpinner } from 'react-spinners-kit';
import { Rocket } from '../Icons/Rocket';

interface TxProps {
  transactionStatus: string;
}
export function TxItem({ transactionStatus }: TxProps) {
  const confirmationStatus =
    transactionStatus === 'confirmed'
      ? 'Confirmed!'
      : transactionStatus === 'failed'
      ? 'Failed'
      : 'Pending Transaction...';

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ width: 'full' }}
      >
        <Box style={{ paddingTop: '70px', marginBottom: '45px' }}>
          <Text
            color="accentColorForeground"
            font="body"
            size="23"
            weight="medium"
          >
            {confirmationStatus}
          </Text>
        </Box>
        <Box style={{ width: '125px', height: '200px', zIndex: '10' }}>
          <Rocket />
        </Box>
        <Box style={{ transform: 'rotate(90deg)', zIndex: '1' }}>
          <PushSpinner color="white" />
        </Box>
      </Box>
    </>
  );
}

export interface TransactionModalProps {
  transactionStatus: string;
  open: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

const TransactionModal = ({
  transactionStatus,
  onClose,
  open,
}: TransactionModalProps) => {
  const titleId = 'rk_account_modal_title';

  return (
    <>
      <Dialog onClose={onClose} open={open} titleId={titleId}>
        <TxDialogContent bottomSheetOnMobile padding="0">
          <Box
            style={{
              height: '476px',
              width: '500px',
            }}
          >
            <TxItem transactionStatus={transactionStatus} />
          </Box>
        </TxDialogContent>
      </Dialog>
    </>
  );
};
export default TransactionModal;
