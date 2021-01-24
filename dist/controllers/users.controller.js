"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class CostumersController {
    // Get all
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield user_1.default.find({});
                if (docs) {
                    return res.status(200).json(docs);
                }
                else {
                    return res.status(400).json({ success: false, msg: 'users not found' });
                }
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
    // Insert
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costumer = new user_1.default({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: req.body.password
                });
                if (costumer) {
                    const obj = yield costumer.save();
                    return res.json({ success: true, msg: ' Costumer is Created successfully.' });
                }
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: 'Costumer  Email already use' });
            }
        });
    }
    // Get by id
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield user_1.default.findById({ _id: req.params.id });
                if (obj)
                    return res.status(200).json(obj);
                else {
                    return res.status(404).json({ error: 'Costumer not found' });
                }
                ;
            }
            catch (err) {
                return res.status(404).json({ error: err.message });
            }
        });
    }
    // Update by id
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costumer = yield user_1.default.findById({ _id: req.params.id }).exec();
                costumer.set(req.body);
                const result = yield costumer.save();
                return res.json({ success: true, msg: ' User is Update successfully.' });
            }
            catch (err) {
                return res.status(404).json({ success: false, msg: 'User does not exist!' });
            }
        });
    }
    // Delete by id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.deleteOne({ _id: req.params.id }).exec();
                return res.json({ success: true, msg: ' User is Deleted successfully.' });
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: 'User does not exist!' });
            }
        });
    }
}
exports.default = new CostumersController;
//# sourceMappingURL=users.controller.js.map