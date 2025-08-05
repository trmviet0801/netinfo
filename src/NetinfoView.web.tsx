import * as React from 'react';

import { NetinfoViewProps } from './Netinfo.types';

export default function NetinfoView(props: NetinfoViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
