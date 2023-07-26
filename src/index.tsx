import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./config/reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./reducers/store";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_KEY } from "./assets/globals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY}>
  <CookiesProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode> {/*Remove strict mode for deployment */}
    </Provider>
  </CookiesProvider>
  </LoadScript>
);

reportWebVitals();
