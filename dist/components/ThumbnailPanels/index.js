"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./ThumbnailPanels.pcss");
const Image_1 = require("../Image");
exports.ThumbnailPanels = ({ click }) => (React.createElement("div", { className: "ThumbnailPanels" },
    React.createElement("h3", null, "Choose a pre-loaded heap timeline below"),
    React.createElement("div", { className: "panels" },
        React.createElement("a", { onClick: () => click('small') },
            React.createElement(Image_1.default, { src: "/thumbnails/small.png" })),
        React.createElement("a", { onClick: () => click('medium') },
            React.createElement(Image_1.default, { src: "/thumbnails/medium.png" })),
        React.createElement("a", { onClick: () => click('large') },
            React.createElement(Image_1.default, { src: "/thumbnails/large.png" })))));
exports.default = exports.ThumbnailPanels;
//# sourceMappingURL=index.js.map