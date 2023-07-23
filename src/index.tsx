import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./config/reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./reducers/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </CookiesProvider>
);

reportWebVitals();
