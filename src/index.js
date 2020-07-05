import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Custom CSS */
import './assets/main.css'

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);