import { requireNativeView } from 'expo';
import * as React from 'react';

import { NetinfoViewProps } from './Netinfo.types';

const NativeView: React.ComponentType<NetinfoViewProps> =
  requireNativeView('Netinfo');

export default function NetinfoView(props: NetinfoViewProps) {
  return <NativeView {...props} />;
}
