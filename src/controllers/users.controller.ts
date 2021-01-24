import Costumers from "../models/user";
import { Request, Response } from "express";
class CostumersController {

    // Get all
    async getAll(req:Request, res:Response) {
        try {
            const docs = await Costumers.find({});
            if(docs){
            return res.status(200).json(docs);
            } else{
                return res.status(400).json({success: false,msg:'users not found'});
            }
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    // Insert
    async create(req:Request, res:Response) {

        try {
            const costumer = new Costumers({
                fullName:req.body.fullName,
                email:req.body.email,
                password:req.body.password
            })
            if(costumer){
            const obj = await costumer.save();
            return res.json({ success: true, msg: ' Costumer is Created successfully.' });
            }
        } catch (err) {
            return res.status(400).json({success: false, msg: 'Costumer  Email already use'});
        }
    }
    // Get by id
    async get(req:Request, res:Response) {
        try {
            const obj = await Costumers.findById({ _id: req.params.id });
            if (obj)
                return res.status(200).json(obj);
            else { return res.status(404).json({ error: 'Costumer not found' }) };
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }
    // Update by id
    async put(req:Request, res:Response) {
        try {
            const costumer = await Costumers.findById({ _id: req.params.id }).exec();
            costumer.set(req.body);
            const result = await costumer.save();
            return res.json({ success: true, msg: ' User is Update successfully.' });
        }
        catch (err) {
            return res.status(404).json({ success: false, msg: 'User does not exist!' });
        }
    }
    // Delete by id
    async delete(req:Request, res:Response) {
        try {
            await Costumers.deleteOne({ _id: req.params.id }).exec();
            return res.json({ success: true, msg: ' User is Deleted successfully.' });
        }
        catch (err) {
            return res.status(400).json({ success: false, msg: 'User does not exist!' });
        }
    }
}

export default new CostumersController; 