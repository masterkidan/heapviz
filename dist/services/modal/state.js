"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
// import { Epic } from 'redux-observable';
// import { Observable } from 'rxjs';
//Actions
exports.SHOW_MODAL = 'modal/SHOW_MODAL';
exports.HIDE_MODAL = 'modal/HIDE_MODAL';
const initialState = {
    active: false,
    name: null
};
function reducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case exports.SHOW_MODAL:
            return Object.assign({}, state, { active: true, name: payload });
        case exports.HIDE_MODAL:
            return Object.assign({}, state, { active: false });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    modal: {
        SHOW_MODAL: (p) => p,
        HIDE_MODAL: () => { }
    }
});
//# sourceMappingURL=state.js.map