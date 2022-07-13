import React from 'react';
import { RingSpinner } from 'react-spinners-kit';
import type { Transaction } from '../../transactions/transactionStore';

interface Props {
  transactionStatus: Transaction['status'];
}

function TxStatusImage({ transactionStatus }: Props) {
  console.log(transactionStatus);
  return (
    <div
      style={{
        backgroundColor: 'rgba(209, 209, 209, 0.5)',
        height: '72px',
        width: '21px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          top: 8,
          zIndex: 1,
          height: '50px',
          borderRight: '1px solid #A3A3A3',
        }}
      />
      <div
        style={{
          position: 'relative',
          top: -49,
          zIndex: 10,
          backgroundColor: 'rgb(16, 194, 10)',
          height: '9px',
          width: '9px',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'relative',
          top: -25,
          right: 0,
          zIndex: 10,
          backgroundColor:
            transactionStatus === 'pending'
              ? 'rgb(255, 255, 0)'
              : 'rgb(16, 194, 10)',
          height: '9px',
          width: '9px',
          borderRadius: '50%',
          margin: -10,
        }}
      />
      <div
        style={{
          position: 'relative',
          top: 1,
          zIndex: 10,
          backgroundColor:
            transactionStatus === 'failed'
              ? 'rgb(241, 29, 29)'
              : transactionStatus === 'pending'
              ? '#e0e0e0'
              : 'rgb(16, 194, 10)',
          height: '9px',
          width: '9px',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

export default TxStatusImage;
