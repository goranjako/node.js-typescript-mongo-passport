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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.fullName || !req.body.password) {
                    res.json({ success: false, msg: 'Please pass username and password.' });
                }
                else {
                    var newUser = new user_1.default({
                        fullName: req.body.fullName,
                        email: req.body.email,
                        password: req.body.password
                    });
                    // save the user
                    if (newUser) {
                        const obj = yield newUser.save();
                        return res.json({ success: true, msg: ' Costumer is Created successfully.' });
                    }
                }
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: 'Costumer  Email already use' });
            }
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.fullName || !req.body.password) {
                    res.json({ success: false, msg: 'Please pass username and password.' });
                }
                else {
                    yield user_1.default.findOne({
                        email: req.body.email
                    }, (err, user) => {
                        if (err)
                            throw err;
                        if (!user) {
                            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
                        }
                        else {
                            // check if password matches
                            user.comparePassword(req.body.password, (err, isMatch) => {
                                if (isMatch && !err) {
                                    // if user is found and password is right create a token
                                    const token = jsonwebtoken_1.default.sign(user.toJSON(), process.env.SECRET_TOKEN, { expiresIn: '10m' });
                                    // return the information including token as JSON
                                    return res.json({ success: true, token: token });
                                }
                                else {
                                    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                                }
                            });
                        }
                    });
                }
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: 'Costumer  Email already use' });
            }
        });
    }
}
;
exports.default = new Auth();
//# sourceMappingURL=auth.controller.js.map