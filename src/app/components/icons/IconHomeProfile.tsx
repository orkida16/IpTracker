import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      height={props.width ?? '24'}
      viewBox="0 0 24 24"
      width={props.width ?? '24'}
      fill={props.color ?? '#e8eaed'}
      {...props}>
      <Path fill="none" d="M0 0H24V24H0z" />
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0112.28 0C16.43 19.18 14.03 20 12 20z" />
    </Svg>
  );
}

export default SvgComponent;
