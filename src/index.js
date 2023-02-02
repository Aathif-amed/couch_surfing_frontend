import { createRoot } from "react-dom/client";
import App from "./App";

//Roboto Font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ContextProvider from "./Context/ContextProvider";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
