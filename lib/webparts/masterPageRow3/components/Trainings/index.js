var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import { useState } from "react";
//import { sp } from "@pnp/sp"; 
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
// import "./../SimplePoll.scss";
import { getSP } from '../../pnpConfig';
import { SPFx, spfi } from "@pnp/sp";
var MyTrainings = function (props) {
    var _a = useState([]), trainingdata = _a[0], setTrainingData = _a[1];
    var _b = useState(""), currentuser = _b[0], setCurrentUser = _b[1];
    var caml = {
        ViewXml: "<View><ViewFields><FieldRef Name='Title' /><FieldRef Name='Description' /></ViewFields><RowLimit>2</RowLimit></View>",
    };
    var getTrainingDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
        var webUrl, spWebChild, list, trainingOutput, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    webUrl = "".concat(window.location.protocol, "//").concat(window.location.hostname, "/sites/Dev/LearingManag");
                    console.log(webUrl);
                    spWebChild = spfi(webUrl).using(SPFx(props.context));
                    return [4 /*yield*/, spWebChild.web.lists.getByTitle("TrainingCalender")];
                case 1:
                    list = _a.sent();
                    return [4 /*yield*/, list.getItemsByCAMLQuery(caml)];
                case 2:
                    trainingOutput = _a.sent();
                    console.log(list);
                    console.log(trainingOutput);
                    setTrainingData(trainingOutput);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var sendemail = function (Title) { return __awaiter(void 0, void 0, void 0, function () {
        var _sp_1, userInfo, userobj, webUrl, spWebParent, empInfo, actualmanager_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _sp_1 = getSP(props.context);
                    console.log(_sp_1);
                    return [4 /*yield*/, _sp_1.web.currentUser()];
                case 1:
                    userInfo = _a.sent();
                    console.log(userInfo);
                    userobj = userInfo.Email;
                    setCurrentUser(userobj);
                    console.log(userobj);
                    console.log(currentuser, "hi");
                    webUrl = "".concat(window.location.protocol, "//").concat(window.location.hostname, "/sites/Dev");
                    spWebParent = spfi(webUrl).using(SPFx(props.context));
                    empInfo = spWebParent.web.lists
                        .getByTitle("EmployeeDetails")
                        .items.select("ReportingManager/EMail")
                        .expand("ReportingManager")
                        .filter("Name/EMail eq '" + userobj + "'")();
                    console.log(empInfo);
                    actualmanager_1 = " ";
                    empInfo.then(function (responsedata) {
                        console.log(responsedata);
                        var y = JSON.parse(JSON.stringify(responsedata));
                        y.map(function (x) {
                            actualmanager_1 = x.ReportingManager.EMail;
                            console.log(x.ReportingManager.EMail);
                        });
                        console.log(currentuser, actualmanager_1);
                        _sp_1.utility.sendEmail({
                            To: [actualmanager_1],
                            Subject: "Request for" + Title,
                            Body: "Iam interested in" + Title,
                            AdditionalHeaders: {
                                "content-type": "text/html",
                            },
                        });
                        window.alert("Request for Nomination Sent");
                        console.log("emailsent");
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        try {
            console.log("hi");
            getTrainingDetails();
            console.log("hello");
        }
        catch (e) {
            console.log(e);
        }
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rowMain3" },
            React.createElement("div", { className: "row31" },
                React.createElement("h2", null, "My Trainings")),
            console.log(trainingdata),
            React.createElement("table", { className: "training_table" },
                React.createElement("th", null, "Title"),
                React.createElement("th", null, "Apply"),
                trainingdata &&
                    (trainingdata === null || trainingdata === void 0 ? void 0 : trainingdata.map(function (item, i) {
                        return (React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", null,
                                    " ",
                                    item.Title)),
                            React.createElement("td", null,
                                React.createElement("button", { id: "nominate_btn${i}", className: "nominate1", onClick: function () { return sendemail(item.Title); } }, "Nominate"))));
                    }))))));
};
export default MyTrainings;
//# sourceMappingURL=index.js.map