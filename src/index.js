import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import clientConfig from "./graphql.config";
import { Grommet } from "grommet";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = {
  global: {
    colors: {
      error: "#FF4040",
      success: "#00C781",
      warning: "#FFAA15",
      info: "#7D4CDB",
      white: "#fff"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

ReactDOM.render(
  <ApolloProvider client={clientConfig}>
    <Grommet theme={theme} full>
      <App />
    </Grommet>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
