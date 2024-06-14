import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      height={props.width ?? '24'}
      viewBox="0 0 24 24"
      width={props.width ?? '24'}
      fill={props.color ?? '#e8eaed'}
      {...props}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    </Svg>
  )
}

export default SvgComponent
