"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
let _colorGenerator;
function padHex(base) {
    const hex = "000000".split('');
    hex.splice(-base.length, base.length, ...base);
    return hex.join('');
}
exports.padHex = padHex;
function hexToColor(hex) {
    const digits = [];
    hex = hex.replace('#', '');
    for (var i = 0; i < 6; i = i + 2) {
        const color = hex.slice(i, i + 2);
        digits.push(parseInt(color, 16) / 255);
    }
    return digits;
}
exports.hexToColor = hexToColor;
function colorToHex(color, rgb = false) {
    if (rgb && color.length > 3)
        color = color.slice(0, 3);
    let hex = "";
    color.forEach((el) => {
        let elString = el.toString(16);
        if (elString.length === 1)
            elString = "0" + elString;
        hex += elString;
    });
    return hex;
}
exports.colorToHex = colorToHex;
function createColorGenerator(nodeTypes) {
    const _colors = d3_scale_1.scaleOrdinal()
        .domain(nodeTypes)
        .range(d3_scale_1.schemeCategory20);
    _colorGenerator = (type) => {
        const hex = _colors(type);
        return hexToColor(hex).concat(1);
    };
}
exports.createColorGenerator = createColorGenerator;
function color(type) {
    return _colorGenerator(type);
}
exports.color = color;
function modifyColor(color, amount) {
    return color.map((c, i) => i < 3 ? Math.max(Math.min((1 + amount) * c, 255), 0) : c);
}
exports.modifyColor = modifyColor;
//# sourceMappingURL=colors.js.map