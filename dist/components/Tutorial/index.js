"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Tutorial.pcss");
exports.Tutorial = ({ start }) => (React.createElement("div", { className: "Tutorial module" },
    React.createElement("h3", null, "Confused?"),
    React.createElement("button", { onClick: start, className: "btn waves-effect waves-light" }, "Show tutorial")));
exports.default = exports.Tutorial;
//# sourceMappingURL=index.js.map