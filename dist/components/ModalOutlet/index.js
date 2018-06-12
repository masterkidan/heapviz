"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
require("./ModalOutlet.pcss");
const HelpModal_1 = require("../HelpModal");
const StatsModal_1 = require("../StatsModal");
const UnsupportedBrowserModal_1 = require("../UnsupportedBrowserModal");
const state_1 = require("../../services/modal/state");
function getActiveModal(name, node) {
    switch (name) {
        case 'help':
            return React.createElement(HelpModal_1.default, null);
        case 'retainers':
            return React.createElement(StatsModal_1.default, { title: "Retainers", edges: node.retainers });
        case 'edges':
            return React.createElement(StatsModal_1.default, { title: "Edges", edges: node.edges });
        case 'unsupported':
            return React.createElement(UnsupportedBrowserModal_1.default, null);
        default:
            return null;
    }
}
class ModalOutlet extends React.Component {
    componentDidMount() {
        this.closeListener = (ev) => {
            const { active, close } = this.props;
            if (active && ev.keyCode === 27) {
                close();
            }
        };
        window.addEventListener('keydown', this.closeListener);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeListener);
    }
    maybeClose(ev) {
        const { close } = this.props;
        const { target } = ev;
        ~target.className.indexOf('ModalOutlet') && close();
    }
    render() {
        const { active, name, currentNode, close } = this.props;
        return (React.createElement("div", { className: `ModalOutlet ${active ? 'active' : ''}`, onClick: ev => this.maybeClose(ev) },
            React.createElement("div", { className: "close-x", onClick: close }, "\u2715"),
            React.createElement("div", { className: 'Modal' }, getActiveModal(name, currentNode))));
    }
}
exports.ModalOutlet = ModalOutlet;
const { modal: { hideModal } } = state_1.actions;
exports.default = react_redux_1.connect(({ modal: { active, name }, heap: { currentNode } }) => {
    return { active, name, currentNode };
}, dispatch => {
    return {
        close: () => dispatch(hideModal())
    };
})(ModalOutlet);
//# sourceMappingURL=index.js.map