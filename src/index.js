import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './Models/configureStore'
import Routers from './Routers';
import './Styles/index.css';

location.hash = "";

injectTapEventPlugin();

const store = configureStore();

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener("deviceready", function() {
    navigator.splashscreen.hide();
}, false);

ReactDOM.render(
    <Provider store={store}>
	    <Routers />
    </Provider>,
    document.getElementById('root')
);
