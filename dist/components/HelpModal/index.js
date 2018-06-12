"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./HelpModal.pcss");
const Image_1 = require("../Image");
exports.HelpModal = () => (React.createElement("div", { className: "HelpModal" },
    React.createElement("h3", null, "What's the difference between a heap timeline and a heap snapshot?"),
    React.createElement("p", null,
        "A ",
        React.createElement("strong", null, "heap timeline"),
        " is a record of all of the memory allocations in your web application over time - Chrome takes samples at 50ms intervals, allowing you to see how your memory is being allocated as you interact with your app."),
    React.createElement("p", null,
        "A ",
        React.createElement("strong", null, "heap snapshot"),
        " on the other hand is a single representation of your app's memory when you take the snapshot. If a heap timeline is a movie, the heap snapshot is a single frame."),
    React.createElement("h3", null, "How do I create them?"),
    React.createElement("ol", null,
        React.createElement("li", null, "To get started, open up the Chrome DevTools."),
        React.createElement(Image_1.default, { src: "/help-images/devtools.png" }),
        React.createElement("li", null, "In the DevTools, click the Memory tab."),
        React.createElement(Image_1.default, { src: "/help-images/memory.png" }),
        React.createElement("li", null, "Select either \"Record Allocation Timeline\" or \"Take Heap Snapshot\" and click \"Start\"."),
        React.createElement(Image_1.default, { src: "/help-images/snapshot.png" }),
        React.createElement("li", null, "For timelines, click the red dot to stop recording once you are done."),
        React.createElement(Image_1.default, { src: "/help-images/recording.png" }),
        React.createElement("li", null, "Click \"Save\"."),
        React.createElement(Image_1.default, { src: "/help-images/save.png" })),
    React.createElement("a", { href: "https://developers.google.com/web/tools/chrome-devtools/memory-problems/" }, "Read more about using Chrome memory tools to debug memory issues")));
exports.default = exports.HelpModal;
//# sourceMappingURL=index.js.map