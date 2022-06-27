import React, { useState, useEffect } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from '../Dialog/TxDialogContent';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Rocket } from '../Icons/Rocket';
import { ImpulseSpinner, SphereSpinner } from 'react-spinners-kit';
import { DialogContent } from '../Dialog/DialogContent';
import { TxCheck } from '../Icons/TxCheck';
import { CopiedIcon } from '../Icons/Copied';
import * as styles from './TxDialog.css';

interface TxProps {
  transactionStatus: string;
  mobile: boolean;
}
export function TxItem({ transactionStatus, mobile }: TxProps) {
  const pendingTx = transactionStatus === 'pending';
  const confirmedTx = transactionStatus === 'confirmed';
  const confirmationStatus =
    transactionStatus === 'confirmed' ? (
      mobile ? (
        <Box style={{ color: 'white', marginTop: '19px' }}>
          <CopiedIcon />
        </Box>
      ) : (
        <Box style={{ color: 'white' }}>
          <TxCheck />
        </Box>
      )
    ) : transactionStatus === 'failed' ? (
      'Failed'
    ) : (
      'Pending Transaction'
    );

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="hidden"
        style={{ gap: mobile ? '10px' : '45px' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          style={{
            paddingTop: !mobile ? (confirmedTx ? '220px' : '70px') : '',
          }}
        >
          <Text
            color="accentColorForeground"
            font="body"
            size={mobile ? '14' : '23'}
            weight="medium"
          >
            {confirmationStatus}
          </Text>
          {pendingTx ? (
            <Box
              style={{
                paddingBottom: mobile ? '4px' : '6px',
                paddingLeft: '2px',
              }}
            >
              <ImpulseSpinner
                frontColor="white"
                backColor="white"
                size={mobile ? 12 : 14}
              />
            </Box>
          ) : null}
        </Box>
        {!mobile ? (
          <Box className={[pendingTx ? styles.onEnter : styles.onExit]}>
            <Rocket />
          </Box>
        ) : (
          <Box style={{ marginBottom: '3px' }}>
            {pendingTx && <SphereSpinner size={18} />}
          </Box>
        )}
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
  const mobile = isMobile();
  const titleId = 'rk_account_modal_title';

  return (
    <>
      <Dialog onClose={onClose} open={open} titleId={titleId}>
        <TxDialogContent bottomSheetOnMobile padding="8">
          <TxItem transactionStatus={transactionStatus} mobile={mobile} />
        </TxDialogContent>
      </Dialog>
    </>
  );
};
export default TransactionModal;
