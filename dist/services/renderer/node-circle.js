"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
const colors_1 = require("./colors");
function createHitColor(i, v) {
    const base = i.toString(16);
    return colors_1.padHex(base.split(''));
}
function createHitCircle(node, state) {
    const { r, x, y, i, v } = node;
    const hitColor = createHitColor(i, v);
    const color = colors_1.hexToColor(hitColor).concat(1);
    const hitCircle = createCircle(r, x, y, color, state);
    return { hitColor, hitCircle };
}
exports.createHitCircle = createHitCircle;
function createSizeCircles(node, state) {
    const { r, x, y, t, s, v } = node;
    const dark = colors_1.color(t);
    const light = colors_1.modifyColor(dark, 0.1);
    const retainedSize = createCircle(r, x, y, light, state);
    const sizes = [retainedSize];
    const ss = r * s / v;
    if (ss) {
        const selfSize = createCircle(ss, x, y, dark, state);
        sizes.push(selfSize);
    }
    return sizes;
}
exports.createSizeCircles = createSizeCircles;
function createCircle(size, x, y, c, state) {
    const sprite = canvas_1.circle(size, 32, c, state);
    sprite.t = [x, y, 0];
    return sprite;
}
exports.createCircle = createCircle;
function createDropShadow(node, state) {
    const { r, x, y } = node;
    return createCircle(r + 8, x, y, [0, 0, 0, 0.6], state);
}
exports.createDropShadow = createDropShadow;
function createHighlights(node, state) {
    const { t } = node;
    const [retainedSize, selfSize] = createSizeCircles(node, state);
    const highlights = [retainedSize];
    if (selfSize) {
        highlights.push(selfSize);
    }
    return highlights;
}
exports.createHighlights = createHighlights;
function createOutline(node, state) {
    const { r, x, y } = node;
    return createCircle(r + 4, x, y, [255, 0, 0, 0.8], state);
}
exports.createOutline = createOutline;
function intersects(node, x, y) {
    const dx = Math.abs(x - node.x);
    const dy = Math.abs(y - node.y);
    const r = node.r;
    if (dx > r || dy > r)
        return false;
    if (dx + dy <= r)
        return true;
    if (dx * dx + dy * dy <= r * r)
        return true;
}
exports.intersects = intersects;
//# sourceMappingURL=node-circle.js.map