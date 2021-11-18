"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var UserController_1 = __importDefault(require("./controllers/UserController"));
exports.routes = (0, express_1.Router)();
exports.routes.get("/", function (req, res) {
    return res.send("estou no arquivo routes");
});
exports.routes.get("/users", UserController_1.default.index);
exports.routes.post("/users", UserController_1.default.create);
// export default routes;
