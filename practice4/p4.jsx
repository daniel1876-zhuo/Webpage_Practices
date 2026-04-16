import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import Switching from "./components/Switching";

ReactDOM.render(
    <>
        <Header/>
        <Switching/>
    </>, 
    document.getElementById("reactapp")
);
