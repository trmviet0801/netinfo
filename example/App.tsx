import Netinfo from "netinfo";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {Netinfo.isConnected() ? "Connected" : "Offline"}</Text>
      <Text>IP: {Netinfo.ipAddress()}</Text>
      <Text>
        Internet Reachable: {Netinfo.isInternetReachable() ? "True" : "False"}
      </Text>
      <Text>Wifi enable: {Netinfo.isWifiEnable() ? "True" : "False"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
