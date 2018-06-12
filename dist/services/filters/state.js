"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const state_1 = require("../messages/state");
//Actions
exports.UPDATE_FILTER = 'filters/UPDATE_FILTER';
exports.SUBMIT_FILTERS = 'filters/SUBMIT_FILTERS';
exports.initialFilters = {
    retainedSize: 100,
    selfSize: 100,
    edgesCount: 0,
    distance: -1,
    retainersCount: 0,
    type: 'all'
};
function reducer(state = exports.initialFilters, action) {
    switch (action.type) {
        case exports.UPDATE_FILTER:
            const { type, value } = action.payload;
            return Object.assign({}, state, { [type]: value });
        default:
            return state;
    }
}
exports.default = reducer;
exports.actions = redux_actions_1.createActions({
    filters: {
        UPDATE_FILTER: (p) => p,
        SUBMIT_FILTERS: [
            (p) => p,
            () => state_1.sendMessage('Applying filters')
        ]
    }
});
//# sourceMappingURL=state.js.map