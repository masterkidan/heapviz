"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const rxjs_1 = require("rxjs");
const react_router_redux_1 = require("react-router-redux");
const state_1 = require("../heap/state");
const { fromPromise, concat, of } = rxjs_1.Observable;
const { heap: { transferProfile } } = state_1.actions;
//Actions
exports.FETCH_LOCAL_FILE = 'file/FETCH_LOCAL_FILE';
exports.DRAG_OVER = 'file/DRAG_OVER';
exports.DRAG_OUT = 'file/DRAG_OUT';
exports.LOAD_FILE = 'file/LOAD_FILE';
exports.FILE_LOADED = 'file/FILE_LOADED';
const initialState = {
    hasFile: false,
    fetching: false,
    fileName: '',
    dragging: false,
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case exports.LOAD_FILE:
        case exports.FETCH_LOCAL_FILE:
            return Object.assign({}, state, { fetching: true, fileName: action.payload });
        case exports.FILE_LOADED:
            return Object.assign({}, state, { fetching: false, dragging: false, hasFile: true });
        case exports.DRAG_OVER:
            return Object.assign({}, state, { dragging: true });
        case exports.DRAG_OUT:
            return Object.assign({}, state, { dragging: false });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    file: {
        FETCH_LOCAL_FILE: [
            (p) => p,
            (p) => { return { message: `Loading file ${p}` }; }
        ],
        FILE_LOADED: (p) => p,
        DRAG_OVER: () => { },
        DRAG_OUT: () => { },
        LOAD_FILE: [
            (p) => p,
            (p) => { return { message: `Loading file ${p}` }; }
        ],
    }
});
//Epics
const { file: { fileLoaded } } = exports.actions;
exports.loadFile = (action$, store) => action$
    .ofType(exports.FETCH_LOCAL_FILE)
    .mergeMap(({ payload }) => fromPromise(fetch(`/profiles/${payload}`)
    .then(result => result.arrayBuffer())))
    .mergeMap(buff => concat(of(fileLoaded(buff)), of(transferProfile({
    heap: buff,
    width: store.getState().renderer.size * 2
}))));
exports.onFileLoaded = action$ => action$
    .ofType(exports.FETCH_LOCAL_FILE, exports.LOAD_FILE)
    .map(() => react_router_redux_1.push('/viz'));
//# sourceMappingURL=state.js.map