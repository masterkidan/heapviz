import * as _ from 'lodash';
import { Dispatcher, Node } from './index';
import { WebInspector } from '../web-inspector';
import { FilterState } from '../../filters/state';
import { SamplesState } from '../../samples/state';

interface RawNode {
    [key: string]: any
}

interface RawSample {
    [key: string]: any
}

interface Heap {
    nodes: Array<Node>
}

interface NodeFilter {
    minNodeId: number
    maxNodeId: number
}

interface SampleStats {
    nodeCount: number;
    totalSize: number;
    startTime?: number;
    endTime?: number;
}

export class HeapProfile {
    _node: RawNode
    _filter: NodeFilter
    snapshot: any
    nodes: Array<Node>
    samples: Array<Array<Node>>

    constructor(heap: Heap, dispatcher: Dispatcher) {
        //HeapSnapshotProgress accepts a dispatcher with sendEvent method that can receive messages and errors
        // from the heap snapshot generation
        this.snapshot = new WebInspector.JSHeapSnapshot(heap, new WebInspector.HeapSnapshotProgress(dispatcher));
        this._node = this.snapshot.createNode();

        this.createNodes(heap);
        this.createSamples();
    }

    //We're going to avoid creating a tree because of performance implications and instead just create an array of all nodes
    createNodes(heap: Heap) {
        this.nodes = heap.nodes.reduce((all, n, i) => {
            if (i % 6 === 0) {
                const node = this.createNode(i);
                //Filter out the synthetic root node
                if (node.distance > 0) {
                    all.push(node);
                }
            }
            return all;
        }, []);
    }

    createNode(index: number): Node {
        this._node.nodeIndex = index;
        return new Node(this._node);
    }

    createEdges(node: RawNode) {
        this._node.nodeIndex = node.itemIndex;
        return this.createEdgeList(this._node.edges(), 'edge');
    }

    createRetainers(node: RawNode) {
        this._node.nodeIndex = node.itemIndex;
        return this.createEdgeList(this._node.retainers(), 'retainer');
    }

    createEdgeList(iter: any, key: string) {
        const edges = [];
        for (iter; iter.hasNext(); iter.next()) {
            edges.push(iter[key].serialize());
        }

        return edges.sort((a, b) => {
            const ars = a.node.retainedSize;
            const brs = b.node.retainedSize;
            return ars === brs ? 0 : ars > brs ? 1 : -1;
        });
    }

    //Associate a range of nodes with a particular sample to allow for easy segmentation
    createSamples() {
        if (!this.snapshot._samples) {
            return this.samples = [this.getSample(0, 0)];
        }

        this.samples = this.snapshot._samples.timestamps.reduce((all: Array<any>, timestamp: number, idx: number, timestamps: Array<number>) => {
            if (idx === 0 || idx === timestamps.length - 1) return all;
            all.push(this.getSample(
                idx,
                idx
            ));
            return all;
        }, [this.getSample(0, 0)]);

        return this.samples;
    }

    getSample(start: number, end: number) {
        //Return a tree made of nodes that exist between startTime and endTime
        //Assumes find iterates in order
        const samples = this.snapshot._samples;
        if (!samples) return this.nodes;

        //Special case startTime 0 to return all initially assigned ids
        const startId = start === 0 ? 0 : samples.lastAssignedIds[start];
        const endId = samples.lastAssignedIds[end + 1];

        this._filter = { minNodeId: startId || 0, maxNodeId: endId || this.lastId() };
        return this.nodes.filter(this.inSample.bind(this));
    }

    inSample(node: Node) {
        return _.inRange(node.id, this._filter.minNodeId, this._filter.maxNodeId + 1);
    }

    lastId() {
        const ids = this.snapshot._samples.lastAssignedIds;
        return ids[ids.length - 1];
    }

    fetchNode(nodeIdx: number) {
        const node = this.createNode(nodeIdx);
        node.edges = this.createEdges(node);
        node.retainers = this.createRetainers(node);
        return node;
    }

    fetchStats() {
        let lastTime = -1;
        return {
            samples: this.samples.map((sample, i) => {
                const stats: SampleStats = {
                    nodeCount: sample.length,
                    totalSize: sample.reduce((total, node) => total + node.selfSize, 0)
                };

                if (this.snapshot._samples) {
                    stats.endTime = this.snapshot._samples.timestamps[i];
                    stats.startTime = lastTime + 1;
                    lastTime = stats.endTime;
                }
                return stats
            }),
            totals: this.snapshot.getStatistics()
        };
    }

    applyFilters({ filters, start, end }: { filters: FilterState, start: number, end: number }) {
        const { type, ...numFilters } = filters;

        return this.getSample(start, end).filter(
            node => {
                if (node.type === 'synthetic') {
                    return false;
                }

                if (type !== 'all' && node.type !== type) {
                    return false;
                }

                return _.reduce(numFilters,
                    (all, val, key) => all && this.evaluateFilter(node, key, val),
                    true);
            }
        );
    }

    evaluateFilter(node: Node, key: string, val: number | string): boolean {
        if (key === "distance") {
            if (val === -1) {
                return true;
            } else {
                return node[key] === val;
            }
        } else {
            return node[key] >= val;
        }
    }
};