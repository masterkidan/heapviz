"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
//Actions
exports.START_TUTORIAL = 'tutorial/START_TUTORIAL';
exports.STOP_TUTORIAL = 'tutorial/STOP_TUTORIAL';
const initialState = {
    running: false
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case exports.START_TUTORIAL:
            return Object.assign({}, state, { running: true });
        case exports.STOP_TUTORIAL:
            return Object.assign({}, state, { running: false });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    tutorial: {
        START_TUTORIAL: () => { },
        STOP_TUTORIAL: () => { }
    }
});
//# sourceMappingURL=state.js.map