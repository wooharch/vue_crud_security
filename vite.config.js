import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  server: {
    // host: 'd10rrjyt8il5jp.cloudfront.net',
     port: 80,
    //proxy: {
    //  '/api': {
    //    target: 'http://k8s-simple-backendi-12183553ad-1493743248.ap-northeast-2.elb.amazonaws.com/',
    //    changeOrigin: true
    //  }
    //}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
