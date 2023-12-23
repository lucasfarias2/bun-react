import { watch } from "fs";

Bun.serve({
  port: 4321,
  async fetch(request, server) {
    const url = new URL(request.url);
    if (url.pathname === "/dev-server") {
      server.upgrade(request);
      return;
    } else {
      return new Response("Dev server is running");
    }
  },
  websocket: {
    message(ws) {},
    async open(ws) {
      try {
        const distWatcher = watch(
          `${import.meta.dir}/dist`,
          { recursive: true },
          (event, filename) => {
            console.log(`Detected ${event} in ${filename} (dist)`);
            ws.send("reload");
          }
        );
      } catch {
        Bun.build({
          entrypoints: ["./src/entry.ts"],
          outdir: "./dist",
        });
      }
    },
  },
});

const srcWatcher = watch(
  `${import.meta.dir}/src`,
  { recursive: true },
  (event, filename) => {
    Bun.build({
      entrypoints: ["./src/entry.ts"],
      outdir: "./dist",
    });

    console.log(`Detected ${event} in ${filename} (src)`);
  }
);

process.on("SIGINT", () => {
  srcWatcher.close();
  process.exit(0);
});

console.log("Running dev server on port 4321");
