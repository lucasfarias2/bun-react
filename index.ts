import { renderToString } from 'react-dom/server';
import App from './src/shared/pages/App';
import React from 'react';
import getTemplate from '@/server/template';
import Elysia from 'elysia';
import { staticPlugin } from '@elysiajs/static';

const app = new Elysia();

const PORT = Bun.env.PORT || 8080;

app.use(staticPlugin())

app.get('*', () => {
  const stream = renderToString(React.createElement(App));

  const template = getTemplate('Bun-react project', 'app');

  return new Response(template.replace('<!-- react -->', stream), {
    headers: { 'Content-Type': 'text/html' },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
