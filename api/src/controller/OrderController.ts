import { Request,Response } from "express";
import { Order } from "../models/order";
export const CreateOrder = async (req:Request,res:Response)=>{
    try{
    const NewOrder = await Order.create({
        ...req.body,
       FirstName: req.user.personalInformation.firstName,
       LastName: req.user.personalInformation.LastName,
       Address: req.user.personalInformation.Address, 
    });
    res.status(200).send({
        message:"Order created Successfully"
    })
    }
    catch(e)
    {
        res.status(500).send(e);
    }
}