import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      height={props.width ?? '25'}
      viewBox="0 0 25 25"
      width={props.width ?? '25'}
      stroke={props.color ?? '#000'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      color={props.color ?? '#000'}
      {...props}>
      <Path d="M2 2H22V22H2z" />
      <Path d="M11 7h6m-6 5h6m-6 5h6" />
      <Path d="M7 7L7 7" />
      <Path d="M7 12L7 12" />
      <Path d="M7 17L7 17" />
    </Svg>
  );
}

export default SvgComponent;
