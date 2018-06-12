"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Loader.pcss");
exports.Loader = ({ visible, message }) => (React.createElement("div", { className: `Loader ${visible ? 'visible' : ''}` },
    React.createElement("ul", { className: "LoaderImage" },
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null),
        React.createElement("li", null)),
    React.createElement("div", { className: "text" }, message)));
exports.default = exports.Loader;
//# sourceMappingURL=index.js.map