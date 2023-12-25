import pluginReact from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [pluginReact(), tsconfigPaths()],
  build: {
    outDir: './vite',
    manifest: true,
    rollupOptions: {
      input: ['src/client/entries/app.ts', 'src/client/entries/app.css'],
    },
  },
});
