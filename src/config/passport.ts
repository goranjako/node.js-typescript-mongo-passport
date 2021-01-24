import passport from 'passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import User from '../models/user';
import { Request, Response } from "express";

class passportManager {
    
    initialize(){
        var opts = {
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.SECRET_TOKEN
        }
        passport.use(new Strategy(opts, function(payload, done) {
            User.findOne({id: payload.id}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
        return passport.initialize(); 
    }
    
    authenticate(req:Request, res:Response, next:any){
        passport.authenticate('jwt', { session: false}, (err, user, info) => {
          if (err) { return next(err); }
          if (!user) {
              if (info.name === "TokenExpiredError") {
                  return res.status(401).json({ message: "Your token has expired." });
              } else {
                  return res.status(401).json({success: false, msg: 'Unauthorized.'});
              }
          }
          req.user = user;
          return next();
        })(req, res, next);
      };

}
export default new passportManager();  