"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const passport_1 = __importDefault(require("./config/passport"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
function setRoutes(app) {
    const router = express.Router();
    router.route('/register').post(auth_controller_1.default.register);
    router.route('/login').post(auth_controller_1.default.login);
    router.route('/user').post(users_controller_1.default.create);
    router.route('/user').get(passport_1.default.authenticate, users_controller_1.default.getAll);
    router.route('/user/:id').get(users_controller_1.default.get);
    router.route('/user/:id').put(users_controller_1.default.put);
    router.route('/user/:id').delete(passport_1.default.authenticate, users_controller_1.default.delete);
    app.use('/', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map