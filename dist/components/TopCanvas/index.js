"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./TopCanvas.pcss");
const renderer_1 = require("../../services/renderer");
class TopCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cached: props.cached,
            cacheKey: props.cacheKey
        };
    }
    componentWillReceiveProps(props) {
        const { cached, cacheKey, size } = props;
        this.setState({ cached, cacheKey });
        this.canvas.width = size;
        this.canvas.height = size;
        renderer_1.createTopCanvasRenderer(this.canvas);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { onMouseMove, onClick, cached, size } = this.props;
        return (React.createElement("div", { className: "TopCanvas" },
            React.createElement("canvas", { width: size, height: size, className: "topCanvas", onMouseMove: ev => onMouseMove(ev, this.state.cached, this.state.cacheKey), onClick: ev => onClick(ev, this.state.cached, this.state.cacheKey), ref: canvas => {
                    this.canvas = canvas;
                    renderer_1.createTopCanvasRenderer(canvas);
                } })));
    }
}
exports.TopCanvas = TopCanvas;
exports.default = TopCanvas;
//# sourceMappingURL=index.js.map