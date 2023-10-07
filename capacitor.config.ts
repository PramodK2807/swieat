import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zomato.app',
  appName: 'zomato',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
