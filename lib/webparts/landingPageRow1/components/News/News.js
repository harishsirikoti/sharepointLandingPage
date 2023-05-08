import * as React from 'react';
import "../LandingPage/Landing.scss";
var News = function (props) {
    var _a;
    return (React.createElement("div", { className: 'rowMain' },
        React.createElement("div", { className: 'row2' },
            React.createElement("h2", null, "News")),
        React.createElement("div", { className: 'row3' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
            return (React.createElement("p", null, x.Title));
        }))));
};
export default News;
//# sourceMappingURL=News.js.map