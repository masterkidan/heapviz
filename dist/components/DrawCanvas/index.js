"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./DrawCanvas.pcss");
const renderer_1 = require("../../services/renderer");
//We use 5000 as our canvas size because it's large - we don't want to have to deal with a user resizing their window above our largest size.
const CANVAS_SIZE = 5000;
class DrawCanvas extends React.Component {
    constructor(props) {
        super(props);
        //We use 5000 because we want
        const { drawCanvas, cachedDrawCanvas } = renderer_1.createCanvases(CANVAS_SIZE);
        this.drawCanvas = drawCanvas.gl.canvas;
        this.cachedDrawCanvas = cachedDrawCanvas.canvas;
    }
    componentWillReceiveProps({ cached }) {
        if (cached === this.props.cached)
            return;
        const drawAppended = this.mountPoint.children[0] === this.drawCanvas;
        if (cached && drawAppended) {
            this.mountPoint.removeChild(this.drawCanvas);
            this.mountPoint.appendChild(this.cachedDrawCanvas);
        }
        else if (!cached && !drawAppended) {
            this.mountPoint.removeChild(this.cachedDrawCanvas);
            this.mountPoint.appendChild(this.drawCanvas);
        }
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (React.createElement("div", { className: "DrawCanvas", ref: mountPoint => {
                const { cached } = this.props;
                if (!mountPoint)
                    return;
                this.mountPoint = mountPoint;
                mountPoint.appendChild(cached ?
                    this.cachedDrawCanvas :
                    this.drawCanvas);
            } }));
    }
}
exports.DrawCanvas = DrawCanvas;
exports.default = DrawCanvas;
//# sourceMappingURL=index.js.map