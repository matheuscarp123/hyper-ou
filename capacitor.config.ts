import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.hypergym.app",
  appName: "HyperGym",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  ios: {
    scheme: "HyperGym",
  },
}

export default config
