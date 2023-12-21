import { hydrateRoot } from "react-dom/client";
import Home from "./Home";

const rootElement = document.getElementById("root");

if (rootElement) {
  hydrateRoot(rootElement, <Home />);
}
