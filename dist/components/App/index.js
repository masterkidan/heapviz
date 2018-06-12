"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./App.pcss");
const react_redux_1 = require("react-redux");
const Renderer_1 = require("../Renderer");
const StatsWindow_1 = require("../StatsWindow");
const SampleSelector_1 = require("../SampleSelector");
const HoverNode_1 = require("../HoverNode");
const CurrentNode_1 = require("../CurrentNode");
const Filters_1 = require("../Filters");
const Loader_1 = require("../Loader");
const Tutorial_1 = require("../Tutorial");
const JoyrideOutlet_1 = require("../JoyrideOutlet");
const react_router_dom_1 = require("react-router-dom");
const state_1 = require("../../services/modal/state");
const state_2 = require("../../services/tutorial/state");
const { modal: { showModal } } = state_1.actions;
const { tutorial: { startTutorial } } = state_2.actions;
exports.App = ({ hasFile, fetching, showMessage, computing, drawing, message, stats, nodesLength, hoverNode, currentNode, showEdges, showRetainers, start }) => {
    return hasFile
        ? React.createElement("div", { className: "App" },
            React.createElement(Loader_1.default, { visible: showMessage && fetching || computing || drawing, message: message }),
            stats && stats.samples.length > 1 ? React.createElement(SampleSelector_1.default, null) : null,
            React.createElement("div", { className: "left-rail" },
                !computing
                    ? React.createElement(Filters_1.default, null)
                    : null,
                stats ? React.createElement(StatsWindow_1.default, { stats: stats, length: nodesLength }) : null),
            React.createElement("div", { className: "main-window" }, !computing
                ? React.createElement(Renderer_1.default, null)
                : null),
            React.createElement("div", { className: "right-rail" },
                hoverNode ? React.createElement(HoverNode_1.default, { node: hoverNode }) : null,
                currentNode ?
                    React.createElement(CurrentNode_1.default, { node: currentNode, showEdges: showEdges, showRetainers: showRetainers }) : null,
                React.createElement(Tutorial_1.default, { start: start }),
                React.createElement("h1", { className: "logo" }, "HeapViz!")),
            React.createElement(JoyrideOutlet_1.default, null))
        : React.createElement(react_router_dom_1.Redirect, { to: "/" });
};
exports.default = react_redux_1.connect(({ samples: { stats }, heap: { computing, hoverNode, currentNode, nodesLength }, file: { hasFile, fetching }, renderer: { drawing }, messages: { showing: showMessage, message } }) => {
    return {
        hasFile: fetching || hasFile,
        fetching,
        message,
        hoverNode,
        currentNode,
        showMessage,
        stats,
        computing,
        drawing,
        nodesLength
    };
}, dispatch => {
    return {
        showEdges: () => dispatch(showModal('edges')),
        showRetainers: () => dispatch(showModal('retainers')),
        start: () => dispatch(startTutorial())
    };
})(exports.App);
//# sourceMappingURL=index.js.map