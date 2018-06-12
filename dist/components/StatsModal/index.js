"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./StatsModal.pcss");
const filesize = require("filesize");
require("react-table/react-table.css");
const react_table_1 = require("react-table");
function columns() {
    return [
        {
            Header: 'ID',
            accessor: 'edgeIndex'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Type',
            accessor: 'type'
        },
        {
            Header: 'Node Name',
            accessor: 'node.name'
        },
        {
            Header: 'Node Type',
            accessor: 'node.type'
        },
        {
            id: 'nodeRetainedSize',
            Header: 'Node Retained Size',
            accessor: 'node.retainedSize',
            Cell: (props) => filesize(props.value)
        },
        {
            id: 'nodeSelfSize',
            Header: 'Node Self Size',
            accessor: 'node.selfSize',
            Cell: (props) => filesize(props.value)
        }
    ];
}
exports.StatsModal = ({ edges, title }) => {
    return (React.createElement("div", { className: "StatsModal" },
        React.createElement("h3", null, title),
        React.createElement(react_table_1.default, { data: edges, columns: columns(), showPageSizeOptions: false, defaultPageSize: 14, defaultSorted: [{
                    id: 'nodeRetainedSize',
                    desc: true,
                }] })));
};
exports.default = exports.StatsModal;
//# sourceMappingURL=index.js.map