import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { TitleAnimeProvider } from "./providers/TitleAnimeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TitleAnimeProvider>
        <App />
      </TitleAnimeProvider>
    </Provider>
  </React.StrictMode>
);
