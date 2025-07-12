// components/ScanIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ScanIcon = ({ width = 22, height = 22, color = '#3b82f6' }) => (
  <Svg width={width} height={height} viewBox="0 0 15 15" fill="none">
    <Path
      d="M0.5 5V2.5C0.5 1.39543 1.39543 0.5 2.5 0.5H5M10 0.5H12.5C13.6046 0.5 14.5 1.39543 14.5 2.5V5M0.5 10V12.5C0.5 13.6046 1.39543 14.5 2.5 14.5H5M14.5 10V12.5C14.5 13.6046 13.6046 14.5 12.5 14.5H10M2 7.5H13"
      stroke={color}
    />
  </Svg>
);

export default ScanIcon;
