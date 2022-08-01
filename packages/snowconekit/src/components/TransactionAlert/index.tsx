import React from 'react';
import { isMobile } from '../../utils/isMobile';
import type { Transaction } from '../../transactions/transactionStore';
import { Box } from '../Box/Box';
import CheckIcon from '../Icons/check.svg';
import InfoIcon from '../Icons/info.svg';
import ExclamationIcon from '../Icons/exclamationMark.svg';
import LoadingDots from '../Icons/LoadingDots';
import { Text } from '../Text/Text';

export interface TransactionAlertProps {
  trackedTx: Transaction | null;
}

const TransactionAlert = ({ trackedTx }: TransactionAlertProps) => {
  const mobile = isMobile();

  return trackedTx?.status && !mobile ? (
    <Box
      style={{
        position: 'absolute',
        padding: '16px',
        bottom: 0,
        right: 10,
        width: '300px',
        height: '20px',
        borderRadius: '8px',
        border:
          trackedTx?.status === 'confirmed'
            ? '1px solid #2f5430'
            : trackedTx?.status === 'failed'
            ? '1px solid #6f3635'
            : '1px solid #14516d',
        backgroundColor:
          trackedTx?.status === 'confirmed'
            ? '#edf7ed'
            : trackedTx?.status === 'failed'
            ? '#fdedec'
            : '#e5f6fd',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {trackedTx?.status === 'confirmed' ? (
          <img src={CheckIcon} alt="check" height="20px" width="20px" />
        ) : trackedTx?.status === 'failed' ? (
          <img
            src={ExclamationIcon}
            alt="exclamation"
            height="20px"
            width="20px"
          />
        ) : (
          <img src={InfoIcon} alt="info" height="20px" width="20px" />
        )}
        <Box display="flex" position="relative" style={{ paddingLeft: '12px' }}>
          {trackedTx?.status === 'confirmed' ? (
            <Box style={{ color: '#2f5430' }}>
              <Text color={undefined}>Transaction Confirmed!</Text>
            </Box>
          ) : trackedTx?.status === 'failed' ? (
            <Box style={{ color: '#f27573' }}>
              <Text color={undefined}>Transaction Failed!</Text>
            </Box>
          ) : (
            <Box style={{ opacity: '.9' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text color="modalText">Transaction Pending</Text>
                <Box style={{ paddingTop: '11px', paddingLeft: '1px' }}>
                  <LoadingDots size={4} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  ) : null;
};
export default TransactionAlert;
