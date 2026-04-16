import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link} from "react-router-dom";

import Header from "./components/Header";
import Example from "./components/Example";
import States from "./components/States";
import "./p5.css";

ReactDOM.render(
    <>
        <Header/>
        <HashRouter>
            <div className="links">
                <Link className="button" to="/states">States</Link>
                <Link className="button" to="/example">Example</Link>
            </div>
            <Route path="/states" component={States}></Route>
            <Route path="/example" component={Example} />
        </HashRouter>
    </>, 
    document.getElementById("reactapp")
);
