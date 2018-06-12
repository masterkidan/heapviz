"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./HoverNode.pcss");
const Stats_1 = require("../Stats");
const filesize = require("filesize");
function nodeToStats(node) {
    const { d, i, s, v, t, x, y, r } = node;
    return {
        id: i,
        type: t,
        retainedSize: filesize(v),
        selfSize: filesize(s)
    };
}
exports.HoverNode = ({ node }) => {
    const stats = nodeToStats(node);
    return (React.createElement("div", { className: "HoverNode module" },
        React.createElement("h3", null, "Hovered Node"),
        React.createElement(Stats_1.default, { stats: stats })));
};
exports.default = exports.HoverNode;
//# sourceMappingURL=index.js.map