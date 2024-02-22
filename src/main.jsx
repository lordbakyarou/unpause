import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/app/store.js";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Analytics } from "@vercel/analytics/react";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
          <Analytics />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
