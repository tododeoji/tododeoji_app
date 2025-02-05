import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ProgressIcon({ fill }: { fill: string }) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 4.47143V1.5M8 14.5V11.5286M11.5286 8H14.5M1.5 8H4.47143M10.4953 5.50505L12.5964 3.40393M3.40335 12.5963L5.50446 10.4952M10.4953 10.4949L12.5964 12.5961M3.40335 3.40371L5.50446 5.50483"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
