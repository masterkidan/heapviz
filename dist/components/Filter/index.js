"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Filter.pcss");
exports.Filter = ({ type, value, onChange }) => {
    return (React.createElement("div", { className: "Filter" },
        React.createElement("strong", null, type),
        React.createElement("input", { value: value, onChange: onChange, type: "number" })));
};
exports.default = exports.Filter;
//# sourceMappingURL=index.js.map