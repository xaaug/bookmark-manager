import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {ClerkProvider} from '@clerk/clerk-react'

import App from "./App.tsx";

import "./index.css";
import "@aws-amplify/ui-react/styles.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing publishable key')
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App/>
   </ClerkProvider>
  </StrictMode>,
);
