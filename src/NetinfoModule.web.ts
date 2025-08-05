import { registerWebModule, NativeModule } from 'expo';

import { NetinfoModuleEvents } from './Netinfo.types';

class NetinfoModule extends NativeModule<NetinfoModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(NetinfoModule, 'NetinfoModule');
