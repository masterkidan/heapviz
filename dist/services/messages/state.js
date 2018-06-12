"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
function sendMessage(message) {
    return { message };
}
exports.sendMessage = sendMessage;
//Actions
exports.SHOW_MESSAGE = 'message/SHOW_MESSAGE';
exports.HIDE_MESSAGE = 'message/HIDE_MESSAGE';
const initialState = {
    showing: false,
    message: ''
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case exports.SHOW_MESSAGE:
            return Object.assign({}, state, { showing: true, message: action.payload });
        case exports.HIDE_MESSAGE:
            return Object.assign({}, state, { showing: false });
        default:
            return state;
    }
}
exports.default = reducer;
//Action creators
exports.actions = redux_actions_1.createActions({
    message: {
        SHOW_MESSAGE: (p) => p,
        HIDE_MESSAGE: () => { }
    }
});
//Epics
const { message: { showMessage: sm, hideMessage: hm } } = exports.actions;
exports.showMessage = action$ => action$
    .filter(action => action.meta && action.meta.message)
    .map(action => sm(action.meta.message));
exports.hideMessage = action$ => action$
    .filter(action => action.meta && action.meta.hideMessage)
    .map(action => hm());
//# sourceMappingURL=state.js.map