import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RootsApp from "./RootsApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootsApp />
  </StrictMode>
);
