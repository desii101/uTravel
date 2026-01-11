import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './globals.css';
import Routing from './routing/Index.tsx';
import "./utils/i18n.ts";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routing/>
  </BrowserRouter>
)
