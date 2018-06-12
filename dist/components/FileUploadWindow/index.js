"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
require("./FileUploadWindow.pcss");
const state_1 = require("../../services/file/state");
const Header_1 = require("../Header");
const canvasCache_1 = require("../../services/canvasCache");
const state_2 = require("../../services/modal/state");
const state_3 = require("../../services/heap/state");
const ThumbnailPanels_1 = require("../ThumbnailPanels");
const { file: { fetchLocalFile, loadFile, fileLoaded, dragOver, dragOut } } = state_1.actions;
const { modal: { showModal } } = state_2.actions;
const { heap: { transferProfile } } = state_3.actions;
class FileUploadWindow extends React.Component {
    componentDidMount() {
        canvasCache_1.resetCache();
        this.props.testBrowserSupport();
    }
    render() {
        const { onClick, onDragOver, onDragEnd, onDrop, showHelp, fetching, dragging } = this.props;
        return (React.createElement("div", { className: "page" },
            React.createElement(Header_1.Header, null),
            React.createElement("div", { className: `file-upload-window ${dragging ? 'dragging' : ''}`, onDragOver: onDragOver, onDragLeave: onDragEnd, onDrop: onDrop },
                React.createElement("div", { className: "instruction-text" },
                    React.createElement("h3", null, "Drag a heap snapshot or heap timeline here!"),
                    React.createElement("div", null,
                        React.createElement("a", { onClick: showHelp }, "(How do I create a heap timeline or heap snapshot?)")),
                    React.createElement("div", { className: "spacer" }, "~ or ~"),
                    React.createElement(ThumbnailPanels_1.default, { click: onClick })))));
    }
}
exports.FileUploadWindow = FileUploadWindow;
function loadStaticFile(size) {
    switch (size) {
        case 'small':
            return fetchLocalFile('Heap-20161109T212710.heaptimeline');
        case 'medium':
            return fetchLocalFile('Heap-20170129T011211.heaptimeline');
        case 'large':
            return fetchLocalFile('Heap-20161110T224559.heaptimeline');
    }
}
exports.default = react_redux_1.connect(({ file: { fetching, dragging }, renderer: { size } }) => { return { fetching, dragging, size }; }, null, (stateProps, dispatchProps) => {
    const { size } = stateProps;
    const { dispatch } = dispatchProps;
    return Object.assign({}, stateProps, { onClick: (size) => dispatch(loadStaticFile(size)), showHelp: () => dispatch(showModal('help')), onDragOver(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'copy';
            dispatch(dragOver());
        },
        onDragEnd() { dispatch(dragOut()); },
        onDrop(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            const fr = new FileReader();
            const file = ev.dataTransfer.files[0];
            dispatch(loadFile(file.name));
            fr.readAsArrayBuffer(file);
            fr.onloadend = () => {
                dispatch(fileLoaded(fr.result));
                dispatch(transferProfile({
                    heap: fr.result,
                    width: size * 2
                }));
            };
        },
        testBrowserSupport() {
            let canvas;
            let ctx;
            let supported;
            try {
                canvas = document.createElement('canvas');
                ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            }
            catch (e) {
                ctx = false;
            }
            supported = ctx && (typeof window.WebAssembly === 'object');
            canvas = ctx = undefined;
            if (!supported)
                return dispatch(showModal('unsupported'));
        } });
})(FileUploadWindow);
//# sourceMappingURL=index.js.map