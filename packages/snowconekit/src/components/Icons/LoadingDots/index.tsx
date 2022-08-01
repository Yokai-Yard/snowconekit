import React from 'react';
import { loadingDots, ball1, ball2, ball3 } from './loadingdots.css';

type props = {
  size: number;
};

const LoadingDots = ({ size }: props) => {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={loadingDots}
    >
      <div
        style={{ height: `${size}px`, width: `${size}px`, x: '0', y: '0' }}
        className={ball1}
      />
      <div
        style={{ height: `${size}px`, width: `${size}px`, x: '4.4', y: '0' }}
        className={ball2}
      />
      <div
        style={{ height: `${size}px`, width: `${size}px`, x: '8.8', y: '0' }}
        className={ball3}
      />
    </div>
  );
};

export default LoadingDots;
