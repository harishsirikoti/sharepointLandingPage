import * as React from 'react';
import "../LandingPage/Landing.scss";
var Announcements = function (props) {
    var _a;
    return (React.createElement("div", { className: 'rowMain' },
        React.createElement("div", { className: 'row2' },
            React.createElement("h2", null, "Announcements")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
            return (React.createElement("p", null,
                x.Title,
                React.createElement("br", null),
                React.createElement("br", null)));
        }))));
};
export default Announcements;
//# sourceMappingURL=Announcements.js.map