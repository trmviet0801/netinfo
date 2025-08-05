import ExpoModulesCore
import Network
import SystemConfiguration.CaptiveNetwork

public class NetinfoModule: Module {
  private let monitor = NWPathMonitor()
  private let queue = DispatchQueue(label: "NetinfoMonitor")

  public func definition() -> ModuleDefinition {
    Name("Netinfo")

    Function("isConnected") {
      return self.currentPath?.status == .satisfied
    }

    Function("isInternetReachable") {
      return self.currentPath?.isExpensive == false
    }

    Function("isWifiEnable") {
      return self.currentPath?.usesInterfaceType(.wifi) ?? false
    }

    Function("ipAddress") {
      return self.getWiFiAddress()
    }

    OnStartObserving {
      self.monitor.start(queue: self.queue)
    }

    OnStopObserving {
      self.monitor.cancel()
    }
  }

  private var currentPath: NWPath? {
    return monitor.currentPath
  }

  private func getWiFiAddress() -> String? {
    var address: String?

    var ifaddr: UnsafeMutablePointer<ifaddrs>?
    if getifaddrs(&ifaddr) == 0 {
      var ptr = ifaddr
      while ptr != nil {
        let interface = ptr!.pointee
        let addrFamily = interface.ifa_addr.pointee.sa_family

        if addrFamily == UInt8(AF_INET) || addrFamily == UInt8(AF_INET6) {
          let name = String(cString: interface.ifa_name)
          if name == "en0" {
            var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
            getnameinfo(interface.ifa_addr,
                        socklen_t(interface.ifa_addr.pointee.sa_len),
                        &hostname,
                        socklen_t(hostname.count),
                        nil,
                        socklen_t(0),
                        NI_NUMERICHOST)
            address = String(cString: hostname)
            break
          }
        }

        ptr = interface.ifa_next
      }

      freeifaddrs(ifaddr)
    }

    return address
  }
}
