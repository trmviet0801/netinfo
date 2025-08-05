import { requireNativeModule } from 'expo';
import NetInfoType from './Netinfo.types';

export default requireNativeModule<NetInfoType>("Netinfo")
