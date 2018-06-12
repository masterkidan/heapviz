"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./StatsWindow.pcss");
const Stats_1 = require("../Stats");
const filesize = require("filesize");
function getSizes(totals) {
    return Object.keys(totals).reduce((all, key) => {
        all[key] = filesize(totals[key]);
        return all;
    }, {});
}
exports.StatsWindow = ({ stats, length }) => {
    const renderStats = Object.assign({
        ["Number of nodes"]: length,
        ["Number of samples"]: stats.samples.length
    }, getSizes(stats.totals));
    return (React.createElement("div", { className: "StatsWindow module" },
        React.createElement("h3", null, "Profile stats"),
        React.createElement(Stats_1.default, { stats: renderStats })));
};
exports.default = exports.StatsWindow;
//# sourceMappingURL=index.js.map