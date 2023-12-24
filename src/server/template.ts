const isDev = Bun.env.BUN_ENV === 'development';

function renderWsBuilderConnectionScript() {
  return `
  <script>
    const devServerSocket = new WebSocket("ws://localhost:4321/ws")

    devServerSocket.addEventListener("open", () => {
      console.log("Connected ws to builder server");
    });

    devServerSocket.addEventListener("message", (event) => {
      console.log("Received ws message from builder server", event.data);

      if (event.data === "reload") {
        fetch(window.location.pathname).then(response => response.text()).then(data => {
          document.documentElement.innerHTML = data;
        });
      }
    });

    devServerSocket.addEventListener("close", () => {
      console.log("Disconnected ws from builder server");
    });
  </script>
  `;
}

export default function getTemplate(title: string, bundleName: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        ${isDev ? renderWsBuilderConnectionScript() : ''}
      </head>
      <body>
        <div id="root"><!-- react --></div>
        <script id="bundle" src="/public/dist/${bundleName}.js"></script>
      </body>
    </html>
  `;
}
