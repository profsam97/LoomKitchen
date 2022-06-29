import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={client} >
          <App />
              <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
)
