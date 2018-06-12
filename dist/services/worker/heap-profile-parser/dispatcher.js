"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toActionName(name) {
    return `heap/${name.split(/(?=[A-Z])/).map((s) => s.toUpperCase()).join('_')}`;
}
class Dispatcher {
    constructor(globalObject, postMessage) {
        this._objects = [];
        this._global = globalObject;
        this._postMessage = postMessage;
    }
    /**
     * @param {string} name
     * @param {*} data
     */
    sendEvent(eventName, data, transferrables, meta) {
        this._postMessage({
            //Handle both chrome and our standard actions
            type: eventName.indexOf('/') === -1 ? toActionName(eventName) : eventName,
            payload: data,
            meta
        }, transferrables);
    }
}
exports.Dispatcher = Dispatcher;
;
//# sourceMappingURL=dispatcher.js.map