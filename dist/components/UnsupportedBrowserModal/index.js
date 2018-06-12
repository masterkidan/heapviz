"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./UnsupportedBrowserModal.pcss");
exports.UnsupportedBrowserModal = () => (React.createElement("div", { className: "UnsupportedBrowserModal" },
    React.createElement("h3", null, "Your bowser does not support WebGL or WebAssembly"),
    React.createElement("p", null,
        "Please use ",
        React.createElement("a", { href: "https://www.mozilla.org/en-US/firefox/new/" }, "Firefox"),
        " or ",
        React.createElement("a", { href: "https://www.google.com/chrome/browser/desktop/index.html" }, "Google Chrome"))));
exports.default = exports.UnsupportedBrowserModal;
//# sourceMappingURL=index.js.map