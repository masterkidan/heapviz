"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const node_circle_1 = require("./node-circle");
const canvas_1 = require("./canvas");
const picker_1 = require("./picker");
const canvasCache_1 = require("../canvasCache");
let outline;
exports.mousemove = (ev, cached, cacheKey, cb) => {
    ifNodeExists(ev, cached, cacheKey, node => {
        updateTopCanvas(node);
        cb(node);
    });
};
exports.click = (ev, cached, cacheKey, cb) => {
    ifNodeExists(ev, cached, cacheKey, node => {
        updateTopCanvas(node, true);
        cb(node);
    });
};
function ifNodeExists(ev, cached, cacheKey, callback) {
    const { offsetX, offsetY } = ev.nativeEvent;
    const node = picker_1.pickCircle(offsetX, offsetY, cached, cacheKey);
    node && callback(node);
}
//Updates our currently interacted nodes by creating a stack of:
// shadow, outline(optional), retainedSize, selfSize(optional)
function updateTopCanvas(node, newOutline = false) {
    const { topCanvas } = canvasCache_1.canvasState;
    const shadow = node_circle_1.createDropShadow(node, topCanvas);
    const highlights = node_circle_1.createHighlights(node, topCanvas);
    if (newOutline)
        outline = [node_circle_1.createOutline(node, topCanvas), ...highlights];
    const circ = [];
    if (outline)
        circ.push(...outline);
    if (!newOutline)
        circ.push(...highlights);
    circ.unshift(shadow);
    canvas_1.update(circ, topCanvas);
}
function destroyRenderer() {
    canvasCache_1.clearState();
}
exports.destroyRenderer = destroyRenderer;
function createCanvases(size) {
    const dc = document.createElement('canvas');
    dc.width = size;
    dc.height = size;
    const cdc = dc.cloneNode();
    const hc = dc.cloneNode();
    const chc = dc.cloneNode();
    const drawCanvas = canvas_1.initWebGL(dc, [255, 255, 255]);
    const hitCanvas = canvas_1.initWebGL(hc, [255, 255, 255], { antialias: false });
    const cachedDrawCanvas = canvas_1.init2d(cdc);
    const cachedHitCanvas = canvas_1.init2d(chc);
    canvasCache_1.setupCanvasState({
        drawCanvas, hitCanvas, cachedDrawCanvas, cachedHitCanvas
    });
    return { drawCanvas, cachedDrawCanvas };
}
exports.createCanvases = createCanvases;
function createTopCanvasRenderer(canvas) {
    if (!canvas)
        return;
    canvasCache_1.canvasState.topCanvas = canvas_1.initWebGL(canvas, [0, 0, 0, 0], { alpha: true });
    outline = null;
}
exports.createTopCanvasRenderer = createTopCanvasRenderer;
function addNodeToHitCircleMap(node, color, cacheKey) {
    canvasCache_1.hitCircleMap[cacheKey] = canvasCache_1.hitCircleMap[cacheKey] || {};
    canvasCache_1.hitCircleMap[cacheKey][color] = node;
}
function _drawNodes(start, nodes, sub, cacheKey) {
    const { drawCanvas, hitCanvas } = canvasCache_1.canvasState;
    let currentNode = start;
    let timeDiff = 0;
    const startTime = Date.now();
    while (currentNode < nodes.length && timeDiff < 10) {
        const node = nodes[currentNode];
        canvasCache_1.circles.push(...node_circle_1.createSizeCircles(node, drawCanvas));
        const { hitColor, hitCircle } = node_circle_1.createHitCircle(node, hitCanvas);
        canvasCache_1.hitCircles.push(hitCircle);
        addNodeToHitCircleMap(node, hitColor, cacheKey);
        currentNode++;
        timeDiff = Date.now() - startTime;
    }
    if (currentNode < nodes.length) {
        sub.next(currentNode);
        requestAnimationFrame(_drawNodes.bind(null, currentNode, nodes, sub, cacheKey));
    }
    else {
        canvas_1.update(canvasCache_1.circles, drawCanvas);
        canvas_1.update(canvasCache_1.hitCircles, hitCanvas);
        //Cache our canvases as ImageBitmaps here so we can reuse them without needing
        // to re-layout
        canvasCache_1.cacheCanvases(drawCanvas.gl.canvas, hitCanvas.gl.canvas, cacheKey);
        sub.complete();
    }
}
function drawNodes({ nodes, cacheKey }) {
    canvasCache_1.clearCanvas();
    return new rxjs_1.Observable(sub => {
        _drawNodes(0, nodes, sub, cacheKey);
    });
}
exports.drawNodes = drawNodes;
function renderCache(key) {
    const { draw, hit } = canvasCache_1.getCanvases(key);
    const { cachedDrawCanvas, cachedHitCanvas } = canvasCache_1.canvasState;
    cachedDrawCanvas.ctx.drawImage(draw, 0, 0);
    cachedHitCanvas.ctx.drawImage(hit, 0, 0);
    return new rxjs_1.Observable(sub => sub.complete());
}
exports.renderCache = renderCache;
//# sourceMappingURL=index.js.map