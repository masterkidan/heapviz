"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_observable_1 = require("redux-observable");
const react_router_redux_1 = require("react-router-redux");
const createBrowserHistory_1 = require("history/createBrowserHistory");
//Reducers
const state_1 = require("./services/heap/state");
const state_2 = require("./services/file/state");
const state_3 = require("./services/renderer/state");
const state_4 = require("./services/messages/state");
const state_5 = require("./services/filters/state");
const state_6 = require("./services/samples/state");
const state_7 = require("./services/canvasCache/state");
const state_8 = require("./services/modal/state");
const state_9 = require("./services/tutorial/state");
exports.history = createBrowserHistory_1.default();
const rootReducer = redux_1.combineReducers({
    heap: state_1.default, file: state_2.default, renderer: state_3.default, messages: state_4.default, filters: state_5.default, samples: state_6.default,
    canvasCache: state_7.default, modal: state_8.default, tutorial: state_9.default,
    router: react_router_redux_1.routerReducer
});
//Epics
const rootEpic = redux_observable_1.combineEpics(state_1.fetchNode, state_1.transferProfile, state_1.applyFilters, state_1.decodeNodes, state_1.addProgressUpdateMessages, state_2.loadFile, state_2.onFileLoaded, state_3.renderNodes, state_3.createTextures, state_4.showMessage, state_4.hideMessage, state_7.onApplyFilters, state_1.applyInitialFilters, state_3.renderIfCached);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
exports.store = redux_1.createStore(rootReducer, 
//, preloadedState
composeEnhancers(redux_1.applyMiddleware(redux_observable_1.createEpicMiddleware(rootEpic), react_router_redux_1.routerMiddleware(exports.history))));
exports.default = exports.store;
//# sourceMappingURL=store.js.map