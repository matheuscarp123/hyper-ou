import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.matheuscarvalho.hypergym",
  appName: "HyperGym",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#000000",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#dc2626",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#000000",
    },
    App: {
      appendUserAgent: "HyperGym/1.0.0",
    },
    AdMob: {
      applicationId: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX", // Replace with your AdMob App ID
      testingDevices: ["YOUR_TESTING_DEVICE_ID"],
      initializeForTesting: false,
    },
  },
  android: {
    buildOptions: {
      keystorePath: "release-key.keystore",
      keystoreAlias: "hypergym-key",
      releaseType: "APK",
      signingType: "apksigner",
    },
  },
  ios: {
    scheme: "HyperGym",
    buildConfiguration: "Release",
  },
}

export default config
