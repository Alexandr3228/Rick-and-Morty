import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./scss/app.scss";
import App from "./App.tsx";
import { store } from "./redux/store.ts";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        asdasda
      </Provider>
    </BrowserRouter>
  );
}
