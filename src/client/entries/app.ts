import { hydrateRoot } from 'react-dom/client';
import React from 'react';
import App from '@/shared/pages/App';

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, React.createElement(App));
}
