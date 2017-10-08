import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary.jsx';
require("./styles/bootstrap.css")
ReactDom.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.querySelector("#app")
)