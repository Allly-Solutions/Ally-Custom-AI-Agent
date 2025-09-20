import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import './index.css'
import { supabase } from "../supabaseClient.ts";
import React from 'react';
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
