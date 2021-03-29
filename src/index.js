import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MetaTags from "react-meta-tags";

ReactDOM.render(
  <div className="wrapper">
    <MetaTags>
      <title>libry</title>
      <meta name="description" content="Simple online reading list" />
      <meta property="og:title" content="libry" />
      <meta property="og:image" content="./images/CircleIcon.png" />
      <meta property="og:url" content="www.libry.com" />
    </MetaTags>
    <App />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
