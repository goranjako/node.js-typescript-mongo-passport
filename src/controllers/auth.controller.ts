
import User from "../models/user";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";

class Auth {
async register(req: Request, res: Response) {
  try{
    if (!req.body.fullName || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password
        });
        // save the user
        if(newUser){
          const obj = await newUser.save();
          return res.json({ success: true, msg: ' Costumer is Created successfully.' });
          }
        }
      } catch (err) {
          return res.status(400).json({success: false, msg: 'Costumer  Email already use'});
      }
  };
  
  async login(req: Request, res: Response)  {
    try{
      if (!req.body.fullName || !req.body.password) {
          res.json({success: false, msg: 'Please pass username and password.'});
        } else {
      await User.findOne({
      email: req.body.email
      }, (err:any, user:any) => {
        if (err) throw err;
  
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password,  (err:any, isMatch:any) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN,{ expiresIn: '10m' });
              // return the information including token as JSON
              return res.json({success: true, token:token});
            } else {
              return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
    }
} catch (err) {
  return res.status(400).json({success: false, msg: 'Costumer  Email already use'});
}
}
};

export default new Auth();