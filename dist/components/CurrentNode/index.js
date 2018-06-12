"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./CurrentNode.pcss");
const Stats_1 = require("../Stats");
const filesize = require("filesize");
function nodeToStats(node) {
    const { id, edgesCount, className, name, selfSize, retainedSize, retainersCount, distance, type } = node;
    return {
        id,
        type,
        edgesCount,
        retainersCount,
        selfSize: filesize(selfSize),
        retainedSize: filesize(retainedSize),
        className,
        name,
        distance
    };
}
exports.CurrentNode = ({ node, showEdges, showRetainers }) => {
    const stats = nodeToStats(node);
    return (React.createElement("div", { className: "CurrentNode module" },
        React.createElement("h3", null, "Selected Node"),
        React.createElement("div", { className: "stats" },
            React.createElement(Stats_1.default, { stats: stats })),
        node.edges.length ?
            React.createElement("button", { className: "btn waves-effect waves-light", onClick: showEdges }, "Edges") :
            null,
        node.retainers.length ?
            React.createElement("button", { className: "btn waves-effect waves-light", onClick: showRetainers }, "Retainers") :
            null));
};
exports.default = exports.CurrentNode;
//# sourceMappingURL=index.js.map