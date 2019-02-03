import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-select/dist/react-select.css";
import { Component as App } from "./routing";
import { store } from "./store";
import "./styles/base.sass";

const rootEl = document.getElementById("app");
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./routing", () => render(App));
}
