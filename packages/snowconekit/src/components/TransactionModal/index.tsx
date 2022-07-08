import React, { useState, useEffect, useCallback } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from '../Dialog/TxDialogContent';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Rocket } from '../Icons/Rocket';
import { ImpulseSpinner, SphereSpinner } from 'react-spinners-kit';
import { TxCheck } from '../Icons/TxCheck';
import { CopiedIcon } from '../Icons/Copied';
import * as styles from './TxDialog.css';
import type { Transaction } from '../../transactions/transactionStore';
import { CloseButton } from '../CloseButton/CloseButton';

interface TxProps {
  transactionStatus: Transaction['status'];
  mobile: boolean;
  onClose: () => void;
}

export function TxItem({ transactionStatus, mobile, onClose }: TxProps) {
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
    <Box
      style={{
        width: mobile ? '100vw' : '476px',
        height: mobile ? '' : '500px',
      }}
    >
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
          justifyContent="flex-end"
          width="full"
          paddingTop="4"
          paddingRight="20"
        >
          <CloseButton onClose={onClose} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          style={{
            paddingTop: !mobile ? (confirmedTx ? '170px' : '20px') : '',
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
    </Box>
  );
}

export interface TransactionModalProps {
  txModalOpen: boolean;
  closeTxModal: () => void;
  trackedTx: Transaction | null;
}

const TransactionModal = ({
  txModalOpen,
  closeTxModal,
  trackedTx,
}: TransactionModalProps) => {
  const mobile = isMobile();
  const titleId = 'rk_account_modal_title';

  return (
    <>
      <Dialog onClose={closeTxModal} open={txModalOpen} titleId={titleId}>
        <TxDialogContent bottomSheetOnMobile padding="8">
          {trackedTx?.status && (
            <TxItem
              transactionStatus={trackedTx.status}
              mobile={mobile}
              onClose={closeTxModal}
            />
          )}
        </TxDialogContent>
      </Dialog>
    </>
  );
};
export default TransactionModal;
