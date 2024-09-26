import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/routes";
import { Provider } from'react-redux';
import store from './app/Store/store';
import './global.css';  

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ChakraProvider>
    <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
        </Provider>
    </ChakraProvider>
  </StrictMode>
);
