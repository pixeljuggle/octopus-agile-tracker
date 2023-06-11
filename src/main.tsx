import { Example } from 'features/example';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Example />
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          right: 30,
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
