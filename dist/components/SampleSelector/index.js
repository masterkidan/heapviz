"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
require("./SampleSelector.pcss");
const Sample_1 = require("../Sample");
const state_1 = require("../../services/samples/state");
const samples_1 = require("../../services/samples");
const state_2 = require("../../services/filters/state");
//TODO: Clean this bad larry up. Too much going on here!
class SampleSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            isDragging: false,
            dragStart: null,
            dragCurrent: null,
            leftOffset: null
        };
    }
    componentDidMount() {
        this.listener = (ev) => {
            const { onKeyDown, start, end } = this.props;
            onKeyDown(ev, start, end);
        };
        window.addEventListener('keydown', this.listener);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }
    isSelected(i) {
        const { start, end } = this.props;
        return i >= start && i <= end;
    }
    getSampleWidth() {
        const { samples } = this.props;
        return 500 / samples.length;
    }
    getSelectedStyle() {
        const { start, samples, end } = this.props;
        const { isDragging, dragStart, dragCurrent } = this.state;
        const sampleWidth = this.getSampleWidth();
        if (!isDragging) {
            return {
                left: start * sampleWidth + 10,
                width: (1 + end - start) * sampleWidth
            };
        }
        return {
            left: Math.min(dragStart, dragCurrent),
            width: Math.abs(dragCurrent - dragStart)
        };
    }
    onMouseDown(ev) {
        const { clientX } = ev;
        this.setState(state => {
            const { left } = this.hitbox.getBoundingClientRect();
            return Object.assign({}, state, { isDragging: true, dragStart: Math.max(clientX - left, 0) });
        });
        this.mouseMoveListener = e => this.onMouseMove(e);
        this.mouseUpListener = e => this.onMouseUp();
        window.addEventListener('mousemove', this.mouseMoveListener);
        window.addEventListener('mouseup', this.mouseUpListener);
    }
    onMouseMove(ev) {
        ev.preventDefault();
        const { clientX } = ev;
        const { left, right } = this.hitbox.getBoundingClientRect();
        this.setState(state => {
            return Object.assign({}, state, { dragCurrent: Math.min(Math.max(clientX - left, 0), right - left) });
        });
    }
    onMouseUp() {
        window.removeEventListener('mousemove', this.mouseMoveListener);
        window.removeEventListener('mouseup', this.mouseUpListener);
        this.setState(state => {
            return Object.assign({}, state, { isDragging: false });
        });
        const { dragStart, dragCurrent } = this.state;
        const { dragEnd, samples } = this.props;
        const sampleWidth = this.getSampleWidth();
        //Offset by 10 because of our 10 px of wiggle room at the start of the timeline
        const ds = dragStart - 10;
        const dc = dragCurrent - 10;
        const start = Math.floor(Math.max(Math.min(ds, dc), 0) / sampleWidth);
        const end = Math.ceil(Math.min(Math.max(ds, dc), 500) / sampleWidth);
        //Special cases for 0 and samples.length - 1 because otherwise we render the first
        // and last samples unselectable due to the nature of getStart and getEnd
        const newStart = start === 0 ?
            0 :
            samples_1.getStart(start, end, samples, true);
        const newEnd = end === samples.length - 1 ?
            end :
            samples_1.getEnd(newStart, end, samples, false);
        dragEnd(newStart, newEnd);
    }
    render() {
        const { samples, start, end, total } = this.props;
        const sampleWidth = this.getSampleWidth();
        return (React.createElement("div", { className: "SampleSelector", onMouseDown: e => this.onMouseDown(e), ref: hitbox => this.hitbox = hitbox },
            React.createElement("div", { className: "keys" },
                React.createElement("span", { className: "title" }, "Samples:"),
                React.createElement("span", { className: "start" }, "1"),
                React.createElement("span", { className: "end" }, samples.length)),
            React.createElement("div", { className: "Selected", style: this.getSelectedStyle() }),
            React.createElement("div", { className: "Samples" }, samples.map((sample, i) => React.createElement(Sample_1.default, { key: i, sample: sample, total: total, maxHeight: 50, width: sampleWidth, left: 10 + i * sampleWidth, selected: this.isSelected(i) })))));
    }
}
exports.SampleSelector = SampleSelector;
;
const { samples: { updateStart, updateEnd } } = state_1.actions;
const { filters: { submitFilters } } = state_2.actions;
exports.default = react_redux_1.connect(({ samples: { stats, start, end }, filters, renderer: { size } }) => {
    const { samples, totals: { total } } = stats;
    return { samples, total, start, end, size, filters };
}, null, (stateProps, dispatchProps) => {
    const { dispatch } = dispatchProps;
    const { start, end, samples, filters, size } = stateProps;
    return Object.assign({}, stateProps, { onKeyDown: (ev, start, end) => {
            let _start = start, _end = end;
            if (ev.shiftKey) {
                if (ev.keyCode === 37)
                    _start = samples_1.getStart(start, end, samples, false);
                if (ev.keyCode === 39)
                    _start = samples_1.getStart(start, end, samples, true);
            }
            else {
                if (ev.keyCode === 37)
                    _end = samples_1.getEnd(start, end, samples, false);
                if (ev.keyCode === 39)
                    _end = samples_1.getEnd(start, end, samples, true);
            }
            if (_start !== start)
                dispatch(updateStart(_start));
            if (_end !== end)
                dispatch(updateEnd(_end));
            if (_start !== start || _end !== end) {
                dispatch(submitFilters({
                    start: _start,
                    end: _end,
                    size,
                    filters
                }));
            }
        }, dragEnd: (start, end) => {
            dispatch(updateStart(start));
            dispatch(updateEnd(end));
            dispatch(submitFilters({
                start, end, size, filters
            }));
        } });
})(SampleSelector);
//# sourceMappingURL=index.js.map