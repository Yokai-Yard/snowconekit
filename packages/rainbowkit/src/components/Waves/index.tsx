import './waves.css';

import React from 'react';

/* <?xml version="1.0" encoding="UTF-8"?><svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 352"><g id="c" shape-rendering="auto"><g opacity=".6"><path id="d" d="M44,0c0,30,18,58,18,88s-18,58-18,88,18,58,18,88-18,58-18,88H0V0H44Z" fill="#fff"/></g></g></svg> */

/* <? xml version = "1.0" encoding = "UTF-8" ?> <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.15 504"><path id="b" d="M41.26,0c0,42.95,16.88,83.05,16.88,126s-16.88,83.05-16.88,126c0,42.95,16.88,83.05,16.88,126s-16.88,83.05-16.88,126H0V0H41.26Z" fill="none" /></svg> */

export default function Waves() {
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
            fill="rgba(255,255,255,0.40"
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-7}
            fill="rgba(255,255,255,0.35)"
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-12}
            fill="rgba(255,255,255,0.25)"
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-20}
            fill="rgba(255,255,255,0.20)"
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-28}
            fill="rgba(255,255,255,0.15)"
          />
          <use
            xlinkHref="#gentle-wave"
            y={0}
            x={-35}
            fill="rgba(255,255,255,0.95"
          />
        </g>
      </svg>
    </div>
  );
}
