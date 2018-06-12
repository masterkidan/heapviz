"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function takeUntil(source, type) {
    return source
        .multicast(() => new rxjs_1.ReplaySubject(1), messages => messages
        .takeWhile((message) => message.type !== type).concat(messages.take(1)));
}
exports.default = takeUntil;
//# sourceMappingURL=takeUntil.js.map