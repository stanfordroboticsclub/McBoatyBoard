import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/pe-icon-7-stroke.css";
import * as serviceWorker from './legacy/serviceWorker';
import Admin from './Admin'
import routes from "./assets/routes";
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={props => <Admin {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
