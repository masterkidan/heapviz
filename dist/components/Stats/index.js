"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Stats.pcss");
exports.Stats = ({ stats }) => {
    return (React.createElement("div", { className: "Stats" }, Object.keys(stats).map(name => (React.createElement("div", { className: "stat", key: name },
        React.createElement("span", { className: "name" },
            name,
            ": "),
        React.createElement("span", { className: "value" }, stats[name]))))));
};
exports.default = exports.Stats;
//# sourceMappingURL=index.js.map