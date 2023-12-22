import { renderToReadableStream, renderToString } from "react-dom/server";
import App from "src/App";
import React from "react";

Bun.serve({
  port: 8080,
  async fetch(request) {
    const stream = renderToString(React.createElement(App));

    console.log("request", request);

    if (request.url.includes("entry.js")) {
      return new Response(Bun.file("./dist/entry.js"));
    }

    const str = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bun-react</title>
      </head>
      <body>
        <div id="root"><!-- template --></div>
        <script src="/entry.js"></script>
      </body>
    </html>
    `;

    return new Response(str.replace("<!-- template -->", stream), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log("Listening on port 8080");
