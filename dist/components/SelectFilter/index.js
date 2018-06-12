"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./SelectFilter.pcss");
class SelectFilter extends React.Component {
    render() {
        const { onChange, value, nodeTypes } = this.props;
        return (React.createElement("div", { className: "SelectFilter" },
            React.createElement("strong", null, "Type"),
            React.createElement("select", { onChange: onChange, value: value },
                React.createElement("option", { value: "all" }, "all"),
                nodeTypes.map(type => (React.createElement("option", { key: type, value: type }, type))))));
    }
}
exports.SelectFilter = SelectFilter;
exports.default = SelectFilter;
//# sourceMappingURL=index.js.map