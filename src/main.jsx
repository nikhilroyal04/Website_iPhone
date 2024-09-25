import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/routes";
import './global.css';  // Import the global stylesheet

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ChakraProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
