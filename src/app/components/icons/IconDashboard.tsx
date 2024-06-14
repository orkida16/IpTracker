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
      <Path
        clipRule="evenodd"
        d="M9.918 10H7.082A1.57 1.57 0 005.5 11.556v5.89A1.569 1.569 0 007.082 19h2.836a1.569 1.569 0 001.582-1.555v-5.889a1.569 1.569 0 00-1.582-1.555zM9.918 4H7.082A1.54 1.54 0 005.5 5.495v1.014A1.54 1.54 0 007.082 8h2.836A1.54 1.54 0 0011.5 6.508V5.494A1.54 1.54 0 009.918 4zM15.082 13h2.835a1.57 1.57 0 001.583-1.555V5.557A1.569 1.569 0 0017.918 4h-2.836A1.57 1.57 0 0013.5 5.557v5.888A1.569 1.569 0 0015.082 13zM15.082 19h2.835a1.54 1.54 0 001.583-1.492v-1.014A1.54 1.54 0 0017.918 15h-2.836a1.54 1.54 0 00-1.582 1.493v1.013A1.54 1.54 0 0015.082 19z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
