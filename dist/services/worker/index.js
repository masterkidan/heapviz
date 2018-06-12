"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeapWorker = require("worker-loader!./worker");
exports.worker = new HeapWorker();
const rxjs_1 = require("rxjs");
const redux_observable_1 = require("redux-observable");
const { fromEvent } = rxjs_1.Observable;
exports.default = exports.worker;
exports.workerMessages$ = redux_observable_1.ActionsObservable.from(fromEvent(exports.worker, 'message')
    .map(({ data }) => data));
//# sourceMappingURL=index.js.map