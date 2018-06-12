"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vsprintf_1 = require("./lib/vsprintf");
self.vsprintf = vsprintf_1.vsprintf;
const heap_profile_parser_1 = require("./heap-profile-parser");
const rxjs_1 = require("rxjs");
importScripts('/pack-circles/index.js');
const messages_1 = require("./messages");
const { fromEvent } = rxjs_1.Observable;
const dispatcher = new heap_profile_parser_1.Dispatcher(self, postMessage.bind(self));
let heapProfile;
const MAX_NODES = 10000000;
function serializeResponse(nodes) {
    const te = new TextEncoder();
    return te.encode(JSON.stringify(nodes)).buffer;
}
function transferNodes(children, nodes) {
    if (!children.length) {
        return dispatcher.sendEvent(messages_1.SEND_NODES, serializeResponse([]), undefined, 'No nodes in filter');
    }
    let node;
    const wireNodes = [];
    for (var i = 0; i < nodes.size(); i++) {
        node = children[i].toMed();
        node.x = nodes.get(i).x;
        node.y = nodes.get(i).y;
        node.r = nodes.get(i).r;
        wireNodes.push(node);
    }
    const ab = serializeResponse(wireNodes);
    dispatcher.sendEvent(messages_1.SEND_NODES, ab, [ab], { message: 'Nodes have transferred, rendering!' });
}
function fromHeap(heap) {
    const decoder = new TextDecoder();
    const file = decoder.decode(heap);
    const profile = new heap_profile_parser_1.HeapProfile(JSON.parse(file), dispatcher);
    return profile;
}
function receiveProfile({ heap, width }) {
    dispatcher.sendEvent(messages_1.PROGRESS_UPDATE, 'Generating samples...');
    heapProfile = fromHeap(heap);
    dispatcher.sendEvent(messages_1.PROGRESS_UPDATE, 'Generating statistics...');
    const stats = heapProfile.fetchStats();
    dispatcher.sendEvent(messages_1.PROGRESS_UPDATE, 'Transferring data from worker...');
    dispatcher.sendEvent(messages_1.PROFILE_LOADED, {
        stats,
        nodeTypes: heapProfile.snapshot._nodeTypes
    }, undefined, { message: 'Profile has loaded' });
}
function getNodes(filters, start, end) {
    const nodes = heapProfile.applyFilters({ filters, start, end });
    if (nodes.length > MAX_NODES) {
        dispatcher.sendEvent(messages_1.PROGRESS_UPDATE, `Current filter contains ${nodes.length} nodes, max nodes is ${MAX_NODES}. Please increase filter to reduce number of visible nodes`);
        return;
    }
    return nodes;
}
function generateLayout(children, size) {
    const root = new Module.Hierarchy({
        size: [2 * size, 2 * size],
        padding: 1.5
    }, { value: 0, children: children.map(node => node.toSmall()) });
    return root.pack().leaves();
}
function applyFilters({ filters, start, end, size }) {
    //Send samples across in chunks here
    const children = getNodes(filters, start, end);
    dispatcher.sendEvent(messages_1.PROGRESS_UPDATE, 'Calculating layout. If this is taking a long time, please increase the filter');
    const nodes = generateLayout(children, size);
    transferNodes(children, nodes);
    dispatcher.sendEvent(messages_1.TRANSFER_COMPLETE);
}
function fetchNode(idx) {
    const node = heapProfile.fetchNode(idx);
    dispatcher.sendEvent(messages_1.NODE_FETCHED, { idx, node });
}
const source = fromEvent(self, 'message');
const subscription = source.subscribe((e) => {
    const { data: { type, payload } } = e;
    switch (type) {
        case messages_1.TRANSFER_PROFILE:
            receiveProfile(payload);
            break;
        case messages_1.APPLY_FILTERS:
            applyFilters(payload);
            break;
        case messages_1.FETCH_NODE:
            fetchNode(payload);
            break;
    }
});
exports.default = self;
//# sourceMappingURL=worker.js.map