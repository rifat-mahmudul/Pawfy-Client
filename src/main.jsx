import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import AppRoutes from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes></AppRoutes>
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
