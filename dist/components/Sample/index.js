"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Sample.pcss");
function getHeight(sample, total, maxHeight) {
    return Math.ceil((sample.totalSize / total) * maxHeight);
}
exports.Sample = ({ sample, total, maxHeight, width, left, selected }) => (React.createElement("div", { className: `Sample ${selected ? 'selected' : ''}`, style: {
        height: getHeight(sample, total, maxHeight),
        width,
        left
    } }));
exports.default = exports.Sample;
//# sourceMappingURL=index.js.map