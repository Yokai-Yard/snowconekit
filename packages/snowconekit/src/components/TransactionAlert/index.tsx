import React, { useEffect, useMemo } from 'react';
import { isMobile } from '../../utils/isMobile';
import type { Transaction } from '../../transactions/transactionStore';
import { useAccount, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { emojiAvatarForAddress } from '../Avatar/emojiAvatarForAddress';
import { CloseButton } from '../CloseButton/CloseButton';
import CheckIcon from '../Icons/check.svg';
import InfoIcon from '../Icons/info.svg';
import { ImpulseSpinner } from 'react-spinners-kit';
import { Text } from '../Text/Text';
import { AlertBox, TxContent } from './TxAlert.css';

export interface TransactionAlertProps {
  trackedTx: Transaction | null;
  address: ReturnType<typeof useAccount>['address'];
}

const TransactionAlert = ({ trackedTx, address }: TransactionAlertProps) => {
  const mobile = isMobile();
  const titleId = 'rk_account_modal_title';
  useEffect(() => {
    console.log(trackedTx?.status);
  });

  return trackedTx?.status && !mobile ? (
    <Box
      className={AlertBox}
      style={{
        border:
          trackedTx?.status === 'confirmed'
            ? '1px solid #2f5430'
            : '1px solid #14516d',
        backgroundColor:
          trackedTx?.status === 'confirmed' ? '#edf7ed' : '#e5f6fd',
      }}
    >
      <Box className={TxContent}>
        {trackedTx?.status === 'pending' ? (
          <img
            src={InfoIcon}
            alt="check"
            style={{ width: '20px', height: '20px' }}
          />
        ) : (
          <img
            src={CheckIcon}
            alt="check"
            style={{ width: '20px', height: '20px' }}
          />
        )}
        <Box paddingLeft="16">
          {trackedTx?.status === 'pending' ? (
            <Box style={{ opacity: '.9' }}>
              <Box className={TxContent}>
                <Text color="modalText">Transaction Pending</Text>
                <Box paddingTop="12" paddingLeft="1">
                  <ImpulseSpinner size={11} frontColor={'#14516d'} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box style={{ color: '#2f5430' }}>
              <Text color={undefined}>Transaction Complete!</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  ) : null;
};
export default TransactionAlert;

// 1 hook, accepts modal, alert, none, allows dev to choose which one to use. default modal. on modal close, show alert.
