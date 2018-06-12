"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const worker_1 = require("../worker");
const state_1 = require("../messages/state");
const state_2 = require("../filters/state");
const state_3 = require("../samples/state");
const takeUntil_1 = require("../../utils/takeUntil");
//Actions
const messages_1 = require("../worker/messages");
const PICK_NODE = 'heap/PICK_NODE';
//Dumb but this avoids circular reference and saves
// needing to make another epic
const _RENDER_CACHE = 'renderer/RENDER_CACHE';
//Reducer
function reducer(state = {
        message: 'Idle',
        nodesLength: 0,
    }, { type, payload }) {
    switch (type) {
        case messages_1.APPLY_FILTERS: {
            return Object.assign({}, state, { computing: true });
        }
        case PICK_NODE:
            return Object.assign({}, state, { hoverNode: payload });
        case messages_1.TRANSFER_PROFILE:
            return Object.assign({}, state, { computing: true });
        case messages_1.NODE_FETCHED:
            return Object.assign({}, state, { currentNode: payload.node });
        case messages_1.PROFILE_LOADED:
            const { nodeTypes } = payload;
            return Object.assign({}, state, { nodeTypes });
        case _RENDER_CACHE:
            return Object.assign({}, state, { computing: false });
        case messages_1.TRANSFER_COMPLETE:
            return Object.assign({}, state, { computing: false, nodes: payload, nodesLength: payload.length });
        default:
            return state;
    }
}
exports.default = reducer;
;
//Action creators
exports.actions = redux_actions_1.createActions({
    heap: {
        APPLY_FILTERS: (p) => p,
        FETCH_NODE: (p) => p,
        TRANSFER_PROFILE: [
            (p) => p,
            () => state_1.sendMessage('Begun transfer')
        ],
        TRANSFER_COMPLETE: [
            (p) => p,
            () => state_1.sendMessage('Transfer complete!')
        ],
        PICK_NODE: (p) => p
    }
});
//Epics
exports.applyFilters = action$ => action$
    .ofType(messages_1.APPLY_FILTERS)
    .mergeMap(action => {
    worker_1.worker.postMessage(action);
    return worker_1.workerMessages$
        .takeUntil(worker_1.workerMessages$.ofType(messages_1.TRANSFER_COMPLETE));
});
exports.fetchNode = action$ => action$
    .ofType(messages_1.FETCH_NODE)
    .mergeMap(action => {
    worker_1.worker.postMessage(action);
    return worker_1.workerMessages$
        .ofType(messages_1.NODE_FETCHED)
        .take(1);
});
exports.transferProfile = action$ => action$
    .ofType(messages_1.TRANSFER_PROFILE)
    .mergeMap(action => {
    worker_1.worker.postMessage(action);
    return takeUntil_1.default(worker_1.workerMessages$, messages_1.PROFILE_LOADED);
});
const { filters: { submitFilters } } = state_2.actions;
const { start, end } = state_3.initialSamples;
exports.applyInitialFilters = (action$, store) => action$
    .ofType(messages_1.PROFILE_LOADED)
    .map(() => submitFilters({ filters: state_2.initialFilters, start, end, size: store.getState().renderer.size }));
const { heap: { transferComplete } } = exports.actions;
exports.decodeNodes = action$ => action$
    .ofType(messages_1.SEND_NODES)
    .map(({ payload: nodes }) => {
    const decoder = new TextDecoder();
    const heap = JSON.parse(decoder.decode(nodes));
    return transferComplete(heap);
});
const { message: { showMessage } } = state_1.actions;
exports.addProgressUpdateMessages = action$ => action$
    .ofType(messages_1.PROGRESS_UPDATE)
    .map(action => showMessage(action.payload));
//# sourceMappingURL=state.js.map