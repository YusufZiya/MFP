import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  if (!!onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathName }) => {
      console.log(nextPathName);
      const { pathName } = history.location;

      if (pathName !== nextPathName) {
        history.push(nextPathName);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_auth-dev-root");
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
