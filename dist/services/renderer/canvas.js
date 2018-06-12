"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glBuffer = require("gl-buffer");
const glClear = require("gl-clear");
const context = require("gl-context");
const glShader = require("gl-shader");
const frag = require("raw!./shader.frag");
const vert = require("raw!./shader.vert");
const create = require("gl-mat4/create");
const identity = require("gl-mat4/identity");
const translate = require("gl-mat4/translate");
const scale = require("gl-mat4/scale");
const ortho = require("gl-mat4/ortho");
const projectionMatrix = create();
const matrix = create();
function initWebGL(canvas, bg, options) {
    const cache = {};
    const clear = glClear({ color: bg });
    const gl = context(canvas, Object.assign({
        premultipliedAlpha: false,
        alpha: false,
        antialias: true
    }, options));
    const shader = glShader(gl, vert, frag);
    shader.attributes.aPosition.location = 0;
    var width = gl.drawingBufferWidth;
    var height = gl.drawingBufferHeight;
    clear(gl);
    gl.viewport(0, 0, width, height);
    ortho(projectionMatrix, 0, width, height, 0, 0, 1);
    shader.bind();
    shader.uniforms.uProjection = projectionMatrix;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    return { cache, clear, gl, shader };
}
exports.initWebGL = initWebGL;
function init2d(canvas) {
    return {
        canvas,
        ctx: canvas.getContext('2d')
    };
}
exports.init2d = init2d;
//Radius, scale, color
function circle(r, s, c, state) {
    const { cache, gl } = state;
    if (!cache[s]) {
        var e = s + 2;
        var fan = new Float32Array(e * 2);
        var pi2 = 2 * Math.PI;
        var j = 0;
        fan[j++] = 0;
        fan[j++] = 0;
        for (var i = 0; i <= e; i++) {
            fan[j++] = Math.cos(i * pi2 / s);
            fan[j++] = Math.sin(i * pi2 / s);
        }
        cache[s] = glBuffer(gl, fan);
    }
    return {
        c,
        s: [r, r, 0],
        t: [0, 0, 0],
        vertices: cache[s],
        d: gl.TRIANGLE_FAN,
        l: s + 2
    };
}
exports.circle = circle;
function update(objects, state) {
    const { gl, clear, shader } = state;
    clear(gl);
    for (var i = 0; i < objects.length; i++) {
        var o = objects[i];
        identity(matrix);
        translate(matrix, matrix, o.t);
        scale(matrix, matrix, o.s);
        shader.uniforms.uModelView = matrix;
        shader.uniforms.uModelColor = o.c;
        o.vertices.bind();
        shader.attributes.aPosition.pointer();
        gl.drawArrays(o.d, 0, o.l);
    }
}
exports.update = update;
function dispose(state) {
    const { cache, shader } = state;
    Object.keys(cache).forEach(function (k) {
        cache[k].unbind();
        cache[k].dispose();
        delete cache[k];
    });
    shader.dispose();
}
exports.dispose = dispose;
exports.default = { initWebGL, init2d, update, dispose, circle };
//# sourceMappingURL=canvas.js.map