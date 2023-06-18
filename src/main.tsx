import { SettingsProvider } from 'features/settings/providers/SettingsProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'routes';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <Routes />
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
