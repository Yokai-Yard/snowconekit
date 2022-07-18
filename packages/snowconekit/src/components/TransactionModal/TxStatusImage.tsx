import React from 'react';
import type { Transaction } from '../../transactions/transactionStore';
import {
  BottomCircle,
  CenterLine,
  MiddleCircle,
  PillContainer,
  TopCircle,
} from './StatusBox.css';

interface Props {
  transactionStatus: Transaction['status'];
}

function TxStatusImage({ transactionStatus }: Props) {
  return (
    <div className={PillContainer}>
      <div className={CenterLine} />
      <div className={TopCircle} />
      <div
        className={MiddleCircle}
        style={{
          backgroundColor:
            transactionStatus === 'pending'
              ? 'rgb(255, 255, 0)'
              : 'rgb(16, 194, 10)',
        }}
      />
      <div
        className={BottomCircle}
        style={{
          backgroundColor:
            transactionStatus === 'failed'
              ? 'rgb(241, 29, 29)'
              : transactionStatus === 'pending'
              ? '#e0e0e0'
              : 'rgb(16, 194, 10)',
        }}
      />
    </div>
  );
}

export default TxStatusImage;
