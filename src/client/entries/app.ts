import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '@/shared/pages/App';

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, React.createElement(App));
}
