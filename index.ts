import { staticPlugin } from '@elysiajs/static';
import Elysia from 'elysia';
import React from 'react';
import { renderToString } from 'react-dom/server';
import getTemplate from '@/server/template';
import App from '@/shared/pages/App';

const app = new Elysia();

const PORT = Bun.env.PORT || 3000;

app.use(staticPlugin({ assets: './public', prefix: '/public' }));
app.use(staticPlugin({ assets: './dist', prefix: '/dist' }));

app.get('*', () => {
  const stream = renderToString(React.createElement(App));

  const template = getTemplate('Bun-react project', 'app');

  return new Response(template.replace('<!-- react -->', stream), {
    headers: { 'Content-Type': 'text/html' },
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}...`);
});
