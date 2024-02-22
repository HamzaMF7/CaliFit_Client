import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContext from "./utils/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContext>
          <App />
        </AppContext>
      </PersistGate>
    </Provider>
  </HashRouter>
);
