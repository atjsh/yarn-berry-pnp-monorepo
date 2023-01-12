import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@packages/shared'],
    force: true,
  },
  build: {
    commonjsOptions: {
      include: [/.yarn/],
    },
  },
  envDir: './',
  plugins: [
    react(),
    // @ts-ignore
    // TODO: 라이브러리의 버그로 인해 ts-ignore 없이는 타입 에러가 발생함.
    // https://github.com/antfu/vite-plugin-restart/issues/14 참고.
    // 해당 이슈가 고쳐진 후에는 ts-ignore가 제거되어도 됨.
    ViteRestart.default({
      restart: ['../shared/dist/**/*.js'],
    }),
  ],
});
