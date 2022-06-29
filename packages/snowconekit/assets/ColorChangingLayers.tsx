import React from 'react';
import Values from 'values.js';
import rgbHex from 'rgb-hex';

type hexProps = {
  shade: string[];
  tint: string[];
  base: string[];
};

const hexArray: hexProps = {
  shade: [],
  tint: [],
  base: [],
};

const Svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 350 519"
  >
    <defs>
      <clipPath id="d">
        <rect width="350" height="519" fill="none" />
      </clipPath>
      <filter id="e" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="f" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="f" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="h" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="i" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="i" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="k" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="l" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="l" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="n" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="o" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="o" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="q" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="r" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="r" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="t" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="u" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="u" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="w" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="x" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="x" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="z" filterUnits="userSpaceOnUse">
        <feOffset dx="0" dy="6" />
        <feGaussianBlur result="aa" stdDeviation="13" />
        <feFlood flood-color="#000" flood-opacity=".23" />
        <feComposite in2="aa" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="ae"
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
      </filter>
      <mask
        id="ad"
        x="192"
        y="29"
        width="139"
        height="134"
        maskUnits="userSpaceOnUse"
      >
        <g filter="url(#ae)">
          <image
            width="139"
            height="134"
            transform="translate(192 29)"
            xlink:href="data:image/png;base64,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"
          />
        </g>
      </mask>
    </defs>
    <g isolation="isolate">
      <g id="b">
        <g id="c">
          <g clip-path="url(#d)">
            <g>
              <rect
                id="g"
                x="-.37"
                y="-.44"
                width="350"
                height="519.51"
                transform="translate(349.26 518.63) rotate(180)"
                fill="#993d7a"
                filter="url(#e)"
              />
              <path
                id="j"
                d="M80.35,519.07c33.84-74.22,19.56-82.85-22.59-96.84-42.16-14-21.88-72.64-58.12-73.09V-.44H349.63V519.07H80.35Z"
                fill="#b3478f"
                filter="url(#h)"
              />
              <path
                id="m"
                d="M146.84,519.07c-.63-44.42,29.91-83.7,12.7-120.72s-76.41-5.39-99.21-55.35C37.53,293.03-.37,314.55-.37,314.55V-.44H349.63V519.07H146.84Z"
                fill="#cc52a3"
                filter="url(#k)"
              />
              <path
                id="p"
                d="M198.59,519.07c29.68-37.2,32.8-61.13,14.25-93.18-18.55-32.05-40.65-27.99-69.9-71.33-29.25-43.34-19.35-81.08-57.51-93.05-38.16-11.96-58.16,22.57-85.8,22.57V-.44H349.63V519.07H198.59Z"
                fill="#e65cb8"
                filter="url(#n)"
              />
              <path
                id="s"
                d="M276.98,519.07c24.09-67-21.08-81.74-45.17-114.85-24.09-33.11-32.78-77.51-67.97-99.14-35.19-21.63-56.54,2.48-83.5-10.16-26.96-12.64-13.43-51.17-80.72-45.6V-.44H349.63V519.07h-72.65Z"
                fill="#f6c"
                filter="url(#q)"
              />
              <path
                id="v"
                d="M326.02,519.07c12.91-76.48-31.83-75.57-61.46-125.24-29.63-49.66-16.12-110.16-50-125.51-33.88-15.35-53.8,9.97-98.29-9.01C71.79,240.33,78.46,192.93-.37,207.83V-.44H349.63V519.07h-23.61Z"
                fill="#ff75d1"
                filter="url(#t)"
              />
              <path
                id="y"
                d="M349.63,444.85c-59.31-26.64-25.12-122.8-71.79-161.63-46.67-38.83-77-24.38-121.31-50.11C112.22,207.37,110.5,108.5-.37,164.03V-.44H349.63V444.85Z"
                fill="#ff94db"
                filter="url(#w)"
              />
              <path
                id="ab"
                d="M349.63,380.92c-30.06-21.22-2.8-84.15-38.67-134.27-35.86-50.11-87.1-36.12-116.46-82.62-29.37-46.5-45.93-100.23-106.47-109.03C27.48,46.2-.37,103.99-.37,103.99V-.44H349.63V380.92Z"
                fill="#fff"
                filter="url(#z)"
              />
              <g id="ac">
                <path
                  d="M323.87,140.37c14.2-30.51-3.25-59.54-47.13-69.77-43.88-10.23-58.18-44.68-74.75-38.13-16.57,6.55-2.92,65.46,24.34,99.17,27.27,33.71,83.33,39.24,97.53,8.73Z"
                  fill="#ff94db"
                />
                <g mask="url(#ad)">
                  <g mix-blend-mode="darken" opacity=".19">
                    <path d="M323.87,140.37c14.2-30.51-3.25-59.54-47.13-69.77-43.88-10.23-58.18-44.68-74.75-38.13-16.57,6.55-2.92,65.46,24.34,99.17,27.27,33.71,83.33,39.24,97.53,8.73Z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const ColorChangingLayers = (color: string) => {
  const baseColor = new Values(color);
  const rgbArray = baseColor.all(10);

  for (let i = 0; i < rgbArray.length; i++) {
    const type = rgbArray[i].type as keyof hexProps;
    hexArray[type].push(rgbHex(`${rgbArray[i].rgb}`));
  }

  return (
    <svg
      fill="none"
      height="19"
      viewBox="0 0 20 19"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM7.29297 13.3018C7.58301 13.3018 7.81152 13.2139 7.99609 13.0205L10 11.0166L12.0127 13.0205C12.1973 13.2051 12.4258 13.3018 12.707 13.3018C13.2432 13.3018 13.6562 12.8887 13.6562 12.3525C13.6562 12.0977 13.5508 11.8691 13.3662 11.6934L11.3535 9.67188L13.375 7.6416C13.5596 7.44824 13.6562 7.22852 13.6562 6.98242C13.6562 6.44629 13.2432 6.0332 12.7158 6.0332C12.4346 6.0332 12.2148 6.12109 12.0215 6.31445L10 8.32715L7.9873 6.32324C7.80273 6.12988 7.58301 6.04199 7.29297 6.04199C6.76562 6.04199 6.35254 6.45508 6.35254 6.99121C6.35254 7.2373 6.44922 7.46582 6.63379 7.6416L8.65527 9.67188L6.63379 11.6934C6.44922 11.8691 6.35254 12.1064 6.35254 12.3525C6.35254 12.8887 6.76562 13.3018 7.29297 13.3018Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Svg;
