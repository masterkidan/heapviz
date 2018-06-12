"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Renderer.pcss");
const react_redux_1 = require("react-redux");
const renderer_1 = require("../../services/renderer");
const state_1 = require("../../services/heap/state");
const TopCanvas_1 = require("../TopCanvas");
const DrawCanvas_1 = require("../DrawCanvas");
const debounce = require("lodash.debounce");
const state_2 = require("../../services/filters/state");
const state_3 = require("../../services/renderer/state");
const { heap: { pickNode, fetchNode } } = state_1.actions;
const { filters: { submitFilters } } = state_2.actions;
const { renderer: { resizeRenderer } } = state_3.actions;
class Renderer extends React.Component {
    componentDidMount() {
        const { getSize, container } = this;
        const debouncedResize = debounce(() => {
            this.props.onResize(getSize(container));
        }, 200, { trailing: true });
        this.listener = (event) => debouncedResize();
        window.addEventListener("resize", this.listener);
        this.props.initialSize(getSize(container));
    }
    componentWillUnmount() {
        renderer_1.destroyRenderer();
        window.removeEventListener("resize", this.listener);
    }
    getSize(el) {
        return parseInt(window.getComputedStyle(el, null).getPropertyValue("height"), 10);
    }
    //Fix this on width/height change
    render() {
        const { size, onMouseMove, onClick, cached, cacheKey } = this.props;
        return (React.createElement("div", { className: "Renderer" },
            React.createElement("div", { className: "container", style: { width: size }, ref: el => (this.container = el) },
                React.createElement(DrawCanvas_1.default, { cached: cached }),
                React.createElement(TopCanvas_1.default, { size: 2 * size, onMouseMove: onMouseMove, onClick: onClick, cached: cached, cacheKey: cacheKey }))));
    }
}
exports.Renderer = Renderer;
exports.default = react_redux_1.connect(({ filters, samples: { start, end }, renderer: { size, cached }, canvasCache: { cacheKey } }) => {
    return { size, cached, cacheKey, filters, start, end };
}, null, (stateProps, dispatchProps) => {
    const { dispatch } = dispatchProps;
    const { cached, filters, start, end } = stateProps;
    return Object.assign({}, stateProps, { onMouseMove: (ev, cached, cacheKey) => renderer_1.mousemove(ev, cached, cacheKey, node => dispatch(pickNode(node))), onClick: (ev, cached, cacheKey) => renderer_1.click(ev, cached, cacheKey, node => dispatch(fetchNode(node.d))), onResize: (size) => dispatch(submitFilters({
            filters,
            start,
            end,
            size
        })), initialSize: (size) => dispatch(resizeRenderer(size)) });
})(Renderer);
//# sourceMappingURL=index.js.map