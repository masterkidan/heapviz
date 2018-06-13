"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(rawNode) {
        ['id', 'distance', 'className', 'itemIndex', 'retainersCount', 'name', 'type', 'selfSize', 'retainedSize', 'edgesCount']
            .forEach(prop => this[prop] = rawNode[prop]());
    }
    toSmall() {
        return {
            value: this.retainedSize,
        };
    }
    toMed() {
        return {
            v: this.retainedSize,
            i: this.id,
            d: this.distance,
            s: this.selfSize,
            t: this.type
        };
    }
}
exports.Node = Node;
;
//# sourceMappingURL=node.js.map