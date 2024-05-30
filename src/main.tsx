import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { persistor, store } from "./redux/store.ts";
import "./index.css";
import "./assets/styles/animation.css";
import "modern-normalize";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter basename="/words-learner">
          <App />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
