import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({ resolvers: [NaiveUiResolver()] }),
    viteCompression()
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
  // server: {
  //   // https: true,
  //   // open: 'https://localhost:3000',
  //   // proxy: {
  //   //   '/': {
  //   //     target: 'http://127.0.0.1:3333',
  //   //     changeOrigin: true
  //   //   }
  //   // },
  //   // cors: true
  // }
});