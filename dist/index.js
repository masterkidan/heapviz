"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
require("materialize-css/dist/css/materialize.css");
require("react-joyride/lib/react-joyride-compiled.css");
require("materialize-css/dist/js/materialize.js");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const react_router_1 = require("react-router");
const react_router_redux_1 = require("react-router-redux");
const FileUploadWindow_1 = require("./components/FileUploadWindow");
const App_1 = require("./components/App");
const ModalOutlet_1 = require("./components/ModalOutlet");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_redux_1.ConnectedRouter, { history: store_1.history },
        React.createElement("div", { className: "main" },
            React.createElement(react_router_1.Route, { exact: true, path: "/", component: FileUploadWindow_1.default }),
            React.createElement(react_router_1.Route, { path: "/viz", component: App_1.default }),
            React.createElement(ModalOutlet_1.default, null)))), document.getElementById('root'));
//# sourceMappingURL=index.js.map