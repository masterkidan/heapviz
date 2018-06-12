"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("../renderer/canvas");
exports.circles = [];
exports.hitCircles = [];
exports.hitCircleMap = {};
exports.canvasState = {};
function clearState() {
    clearCanvas();
    canvas_1.dispose(exports.canvasState.drawCanvas);
    canvas_1.dispose(exports.canvasState.hitCanvas);
    canvas_1.dispose(exports.canvasState.topCanvas);
    exports.canvasState.cachedDrawCanvas.canvas.remove();
    exports.canvasState.cachedHitCanvas.canvas.remove();
}
exports.clearState = clearState;
function clearCanvas() {
    exports.circles = [];
    exports.hitCircles = [];
}
exports.clearCanvas = clearCanvas;
function setupCanvasState(setupPayload) {
    Object.assign(exports.canvasState, setupPayload);
}
exports.setupCanvasState = setupCanvasState;
function toCacheKey({ filters, start, end, size }) {
    return `${JSON.stringify(filters)}|${start}|${end}|${size}`;
}
exports.toCacheKey = toCacheKey;
function fromCacheKey(key) {
    const tokens = key.split('|');
    return {
        filters: JSON.parse(tokens[0]),
        start: tokens[1],
        end: tokens[2],
        size: tokens[3]
    };
}
let canvasCache = {};
function cacheCanvases(draw, hit, key) {
    return Promise.all([
        createImageBitmap(draw),
        createImageBitmap(hit)
    ]).then(([draw, hit]) => {
        canvasCache[key] = { draw, hit };
    });
}
exports.cacheCanvases = cacheCanvases;
function getCanvases(key) {
    return canvasCache[key];
}
exports.getCanvases = getCanvases;
function resetCache() {
    canvasCache = {};
}
exports.resetCache = resetCache;
//# sourceMappingURL=index.js.map