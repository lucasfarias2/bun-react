import { renderToString } from "react-dom/server";
import App from "./src/App";
import React from "react";

Bun.serve({
  port: 8080,
  async fetch(request) {
    console.log("Bun", Bun.env.BUN_ENV);
    const url = new URL(request.url);

    if (url.pathname === "/entry.js") {
      return new Response(Bun.file("./dist/entry.js"));
    }

    const stream = renderToString(React.createElement(App));

    const str = `<!DOCTYPE html>
    <html lang="en" id="content">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bun-react</title>
        <script>

        const devServerSocket = new WebSocket("ws://localhost:4321/dev-server");

        devServerSocket.addEventListener("open", () => {
          console.log("Connected to dev server");
        });

        devServerSocket.addEventListener("message", (event) => {
          console.log("Received message from dev server", event.data);

          if (event.data === "reload") {
            fetch(window.location.pathname).then(response => response.text()).then(data => {
              document.documentElement.innerHTML = data;
            });
          }
        });
      
        devServerSocket.addEventListener("close", () => {
          console.log("Disconnected from dev server");
        });

        </script>
      </head>
      <body>
        <h3>Bun</h3>
        <div id="root"><!-- react --></div>
        <script src="/entry.js"></script>
      </body>
    </html>
    `;

    return new Response(str.replace("<!-- react -->", stream), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log("Listening on port 8080");
