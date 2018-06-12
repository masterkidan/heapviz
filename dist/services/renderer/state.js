"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const rxjs_1 = require("rxjs");
const _1 = require("./");
const colors_1 = require("./colors");
const state_1 = require("../heap/state");
const state_2 = require("../filters/state");
const canvasCache_1 = require("../canvasCache");
const { concat, of } = rxjs_1.Observable;
//Actions
const messages_1 = require("../worker/messages");
exports.RENDER_PROFILE = 'renderer/RENDER_PROFILE';
exports.RENDER_CACHE = 'renderer/RENDER_CACHE';
exports.RENDER_BATCH = 'renderer/RENDER_BATCH';
exports.RENDER_COMPLETE = 'renderer/RENDER_COMPLETE';
exports.RESIZE_RENDERER = 'renderer/RESIZE_RENDERER';
const initialState = {
    size: 0,
    cached: false,
    drawing: false
};
function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case exports.RENDER_CACHE:
            return Object.assign({}, state, { drawing: true, cached: true });
        case exports.RENDER_PROFILE:
            return Object.assign({}, state, { drawing: true, cached: false });
        case exports.RENDER_BATCH:
            return Object.assign({}, state, { drawing: true, cached: false, start: payload });
        case exports.RENDER_COMPLETE:
            return Object.assign({}, state, { drawing: false });
        case state_2.SUBMIT_FILTERS:
            return Object.assign({}, state, { size: payload.size });
        case exports.RESIZE_RENDERER:
            return Object.assign({}, state, { size: payload });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    renderer: {
        RENDER_PROFILE: (p) => p,
        RENDER_BATCH: (p) => p,
        RENDER_COMPLETE: [
            () => { },
            () => { return { hideMessage: true }; }
        ],
        TEXTURES_CREATED: () => { },
        RENDER_CACHE: (p) => p,
        RESIZE_RENDERER: (p) => p
    }
});
//Epic
const { renderer: { renderProfile, renderBatch, renderComplete, texturesCreated } } = exports.actions;
exports.renderNodes = (action$, store) => action$
    .ofType(messages_1.TRANSFER_COMPLETE)
    .switchMap(({ payload }) => {
    const { canvasCache: { cacheKey } } = store.getState();
    return concat(of(renderProfile()), _1.drawNodes({ nodes: payload, cacheKey }).map(renderBatch), of(renderComplete()));
});
exports.createTextures = action$ => action$
    .ofType(messages_1.PROFILE_LOADED)
    .map(({ payload: { nodeTypes } }) => {
    colors_1.createColorGenerator(nodeTypes);
    return texturesCreated();
});
const { heap: { applyFilters: af } } = state_1.actions;
const { renderer: { renderCache: rc } } = exports.actions;
exports.renderIfCached = (action$, store) => action$
    .ofType(state_2.SUBMIT_FILTERS)
    .mergeMap(({ payload }) => {
    const key = canvasCache_1.toCacheKey(payload);
    if (canvasCache_1.getCanvases(key)) {
        _1.renderCache(key);
        return concat(of(rc(key)), of(renderComplete()));
    }
    return of(af(payload));
});
//# sourceMappingURL=state.js.map