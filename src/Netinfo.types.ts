import { TurboModule } from "react-native";

interface NetInfoType extends TurboModule {
  isConnected(): boolean | null;
  isInternetReachable(): boolean | null;
  isWifiEnable(): boolean;
  ipAddress(): string;
}

export default NetInfoType