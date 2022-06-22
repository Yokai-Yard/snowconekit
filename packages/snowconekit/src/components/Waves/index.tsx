import './waves.css';

import React, { useContext } from 'react';

import { ThemeContext } from '../RainbowKitProvider/RainbowKitProvider';

export default function Waves() {
  const theme = useContext(ThemeContext);

  const color = theme?.colors && theme?.colors?.modalBackground;
  const wavesColor = color ?? '#fff';

  return (
    <div
      style={{ position: 'absolute', zIndex: 1, width: '90px', height: '100%' }}
    >
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 80 58.15 504"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M41.26,0c0,42.95,16.88,83.05,16.88,126s-16.88,83.05-16.88,126c0,42.95,16.88,83.05,16.88,126s-16.88,83.05-16.88,126H0V0H41.26Z"
          />
        </defs>
        <g className="moving-waves">
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={0}
            opacity={0.4}
            fill={`${wavesColor}`}
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-7}
            opacity={0.35}
            fill={wavesColor}
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-12}
            opacity={0.25}
            fill={wavesColor}
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-20}
            opacity={0.2}
            fill={wavesColor}
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-28}
            opacity={0.15}
            fill={wavesColor}
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-35}
            opacity={0.95}
            fill={wavesColor}
          />
        </g>
      </svg>
    </div>
  );
}
