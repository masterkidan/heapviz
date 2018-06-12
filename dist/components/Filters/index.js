"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Filters.pcss");
const Filter_1 = require("../Filter");
const SelectFilter_1 = require("../SelectFilter");
const react_redux_1 = require("react-redux");
const state_1 = require("../../services/filters/state");
exports.Filters = ({ onChange, onClick, filters, nodeTypes }) => {
    return (React.createElement("div", { className: "Filters module" },
        React.createElement("h3", null, "Filters"),
        Object.keys(filters).map(filter => filter === 'type' ?
            (nodeTypes && React.createElement(SelectFilter_1.default, { key: "type", nodeTypes: nodeTypes, onChange: onChange('type'), value: filters.type })) :
            React.createElement(Filter_1.default, { key: filter, type: filter, value: filters[filter], onChange: onChange(filter) })),
        React.createElement("button", { className: "waves-effect waves-light btn", onClick: () => onClick(filters) }, "Apply")));
};
const { filters: { updateFilter, submitFilters } } = state_1.actions;
exports.default = react_redux_1.connect(({ filters, samples: { start, end }, heap: { nodeTypes }, renderer: { size } }) => { return { filters, start, end, nodeTypes, size }; }, null, (stateProps, dispatchProps) => {
    const { filters, start, end, size } = stateProps;
    const { dispatch } = dispatchProps;
    return Object.assign({}, stateProps, { onChange: (type) => (ev) => {
            //Special case for type select because it comes
            // through as a string
            const value = type === 'type' ?
                ev.target.value :
                parseInt(ev.target.value, 10) || '';
            return dispatch(updateFilter({
                value, type
            }));
        }, onClick: (filters) => dispatch(submitFilters({ filters, start, end, size })) });
})(exports.Filters);
//# sourceMappingURL=index.js.map