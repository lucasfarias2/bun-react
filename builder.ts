import { watch } from 'fs';

const WSPORT = 4321;
const isDev = Bun.env.BUN_ENV === 'development';
const entrypoints = ['./src/client/entries/app.ts'];
const outdir = './public/dist';

if (isDev) {
  const devConfig = {
    entrypoints,
    outdir,
    sourcemap: 'external' as const,
  };

  Bun.build(devConfig);

  Bun.serve({
    port: WSPORT,
    async fetch(request, server) {
      const url = new URL(request.url);
      if (url.pathname === '/ws') {
        server.upgrade(request);
        return;
      } else {
        return new Response('WS server is running.');
      }
    },
    websocket: {
      message(ws) {},
      async open(ws) {
        try {
          const distWatcher = watch(`${import.meta.dir}/dist`, { recursive: true }, (event, filename) => {
              console.log(`Dist folder: File ${event} ${filename}`);
              ws.send('reload');
            }
          );
        } catch {
          Bun.build(devConfig);
        }
      },
    },
  });

  const srcWatcher = watch(`${import.meta.dir}/src`, { recursive: true }, (event, filename) => {
      Bun.build(devConfig);
      console.log(`Src folder: File ${event} ${filename}`);
    }
  );

  process.on('SIGINT', () => {
    srcWatcher.close();
    process.exit(0);
  });

  console.log(
    `Builder watching and WebSocket listening at ws://localhost:${WSPORT}/ws...`
  );
} else {
  await Bun.build({
    entrypoints,
    outdir,
    minify: true,
    splitting: true,
  });

  console.log('Builder executed successfully.');
}
