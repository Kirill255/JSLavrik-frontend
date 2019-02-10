import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

// import "./test-decorators";

import Site from "./components/site";
ReactDOM.render(<Site />, document.querySelector(".app"));
