"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const user_1 = __importDefault(require("../models/user"));
class passportManager {
    initialize() {
        var opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_TOKEN
        };
        passport_1.default.use(new passport_jwt_1.Strategy(opts, function (payload, done) {
            user_1.default.findOne({ id: payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            });
        }));
        return passport_1.default.initialize();
    }
    authenticate(req, res, next) {
        passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Your token has expired." });
                }
                else {
                    return res.status(401).json({ success: false, msg: 'Unauthorized.' });
                }
            }
            req.user = user;
            return next();
        })(req, res, next);
    }
    ;
}
exports.default = new passportManager();
//# sourceMappingURL=passport.js.map