import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {ClerkProvider} from '@clerk/clerk-react'
import {ConvexProvider, ConvexReactClient} from 'convex/react'

import App from "./App.tsx";

import "./index.css";
import "@aws-amplify/ui-react/styles.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing publishable key')
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
   <ConvexProvider client={convex}>
   <App/>
   </ConvexProvider>
   </ClerkProvider>
  </StrictMode>,
);
