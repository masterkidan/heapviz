"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const canvasCache_1 = require("../canvasCache");
const node_circle_1 = require("./node-circle");
const colorBuff = new Uint8Array(4);
function isMatch(color, x, y, cacheKey) {
    let node = canvasCache_1.hitCircleMap[cacheKey][colors_1.colorToHex(color, true)];
    if (node)
        return node_circle_1.intersects(node, x, y) && node;
}
function getCircleFromColor(color, x, y, cacheKey) {
    //First test the retrieved value
    let match = isMatch(color, x, y, cacheKey);
    if (match)
        return match;
    //If it fails, fuzz around the value by 1 pt
    for (let i = 0; i < 3; i++) {
        color[i]--;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let match = isMatch(color, x, y, cacheKey);
            if (match)
                return match;
            color[j]++;
        }
    }
}
function _pickCircle(x, y, cacheKey) {
    const { hitCanvas: { gl } } = canvasCache_1.canvasState;
    gl.readPixels(x, gl.drawingBufferHeight - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, colorBuff);
    return getCircleFromColor(colorBuff, x, y, cacheKey);
}
function _pickCircleCached(x, y, cacheKey) {
    const { cachedHitCanvas: { ctx } } = canvasCache_1.canvasState;
    const { data: colorBuff } = ctx.getImageData(x, y, 1, 1);
    return getCircleFromColor(colorBuff.slice(0, 3), x, y, cacheKey);
}
function pickCircle(x, y, cached, cacheKey) {
    return cached ?
        _pickCircleCached(x, y, cacheKey) :
        _pickCircle(x, y, cacheKey);
}
exports.pickCircle = pickCircle;
//# sourceMappingURL=picker.js.map