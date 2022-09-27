import "./index.css"
import reportWebVitals from "./reportWebVitals";
import store  from "./redux/reduxStore";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

//hakam69745@dnitem.com

root.render(
    //<React.StrictMode>
        <Provider store={store}>
            <App store={store}/>
        </Provider>
    //</React.StrictMode>
);

window.store = store



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
