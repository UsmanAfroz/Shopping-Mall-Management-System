import { Request,Response } from "express";
import { Order } from "../models/order";
import { User } from "../models/user";
export const CreateOrder = async (req:any,res:any)=>{
    
    const user = await User.findById(req.user.user_id);
    console.log(req.body);
   // console.log(user);
    try{
    await Order.create({
        ...req.body,
       FirstName: user?.personalInformation?.firstName,
       LastName: user?.personalInformation?.lastName,
       Address: user?.personalInformation?.Address, 
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