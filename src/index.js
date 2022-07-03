import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { getFavorites } from "./store/movies-actions";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(getFavorites());
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
