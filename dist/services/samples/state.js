"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
//Actions
const messages_1 = require("../worker/messages");
exports.UPDATE_START = 'samples/UPDATE_START';
exports.UPDATE_END = 'samples/UPDATE_END';
exports.initialSamples = {
    start: 0,
    end: 0,
    stats: null
};
function reducer(state = exports.initialSamples, action) {
    const { payload } = action;
    switch (action.type) {
        case exports.UPDATE_START:
            return Object.assign({}, state, { start: payload });
        case exports.UPDATE_END:
            return Object.assign({}, state, { end: payload });
        case messages_1.PROFILE_LOADED:
            return Object.assign({}, state, { stats: payload.stats });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    samples: {
        UPDATE_START: (p) => p,
        UPDATE_END: (p) => p
    }
});
//# sourceMappingURL=state.js.map