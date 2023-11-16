import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster
        richColors
        position="top-center"
        duration={2000}
        toastOptions={{
          style: { fontSize: "18px" },
        }}
      />
    </Provider>
  </BrowserRouter>
);
