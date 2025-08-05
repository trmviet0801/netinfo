import { NativeModule, requireNativeModule } from 'expo';

import { NetinfoModuleEvents } from './Netinfo.types';

declare class NetinfoModule extends NativeModule<NetinfoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NetinfoModule>('Netinfo');
