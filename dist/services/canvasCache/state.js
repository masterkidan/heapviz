"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const _1 = require("./");
const state_1 = require("../filters/state");
//Actions
exports.INITIALIZE_CACHE = 'canvasCache/INITIALIZE_CACHE';
exports.UPDATE_KEY = 'canvasCache/UPDATE_KEY';
const initialState = {
    initialized: false,
    hasCachedCanvases: false,
    cacheKey: null
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case exports.INITIALIZE_CACHE:
            return Object.assign({}, state, { initialized: true });
        case exports.UPDATE_KEY:
            return Object.assign({}, state, { cacheKey: action.payload });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    canvasCache: {
        INITIALIZE_CACHE: () => { },
        UPDATE_KEY: (p) => p
    }
});
//Epics
const { canvasCache: { updateKey } } = exports.actions;
exports.onApplyFilters = action$ => action$
    .ofType(state_1.SUBMIT_FILTERS)
    .map(({ payload }) => updateKey(_1.toCacheKey(payload)));
//# sourceMappingURL=state.js.map