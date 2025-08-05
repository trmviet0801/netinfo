package expo.modules.netinfo

import android.Manifest
import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.wifi.WifiManager
import androidx.annotation.RequiresPermission
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.Inet4Address
import java.net.NetworkInterface

class NetinfoModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Netinfo")

    Function("isConnected") {
      isConnected()
    }

    Function("isInternetReachable") {
      isInternetReachable()
    }

    Function("isWifiEnable") {
      isWifiEnable()
    }

    Function("ipAddress") {
      ipAddress()
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun isConnected(): Boolean {
    val cm = appContext.reactContext
      ?.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager ?: return false

    val currentActiveNetwork = cm.activeNetwork ?: return false
    val capabilities = cm.getNetworkCapabilities(currentActiveNetwork) ?: return false

    return capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun isInternetReachable(): Boolean {
    val cm = appContext.reactContext
      ?.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager ?: return false

    val currentActiveNetwork = cm.activeNetwork ?: return false
    val capabilities = cm.getNetworkCapabilities(currentActiveNetwork) ?: return false

    return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
  }

  private fun isWifiEnable(): Boolean {
    val wm = appContext.reactContext
      ?.getSystemService(Context.WIFI_SERVICE) as? WifiManager ?: return false
    return wm.isWifiEnabled
  }

  private fun ipAddress(): String {
    val interfaces = NetworkInterface.getNetworkInterfaces()
    for (interf in interfaces) {
      if (isWifiOrMobile(interf.name)) {
        val addresses = interf.inetAddresses
        for (address in addresses) {
          if (!address.isLoopbackAddress &&
            !address.isLinkLocalAddress &&
            address is Inet4Address
          ) {
            return address.hostAddress ?: ""
          }
        }
      }
    }
    return ""
  }

  private fun isWifiOrMobile(interfaceName: String): Boolean {
    return when {
      interfaceName.startsWith("wlan") -> true
      interfaceName.startsWith("rmnet") ||
              interfaceName.startsWith("ccmni") ||
              interfaceName.startsWith("pdp") -> true
      else -> false
    }
  }
}
