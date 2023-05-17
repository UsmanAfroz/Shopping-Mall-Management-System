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

export const GetOrders = async(req:Request, res:Response)=>{
    try{
        const Orders = await Order.find();
    res.status(200).send(Orders);
    }
    catch(e){
        res.status(500).send("Internal Server Error")
    }
}

export const deleteOrder = async(req:Request,res:Response)=>{
    if(!req.params.id){
        res.status(400).send("Please provide an id")
    }
    try{
        await Order.findByIdAndDelete(req.params.id)
    res.status(200).send("Order deleted successfully")
    }
    catch(e){
        res.status(500).send("Internal Server Error");
    }
}

export const updateOrders = async(req:Request, res:Response){
    if(!req.params.id){
        res.status(400).send("Please provide an id")
    }
    try{
        await Order.findByIdAndUpdate({id:req.params.id},req.body,{
            new:true,
        })
    res.status(200).send("Order updated successfully")
    }
    catch(e){
        res.status(500).send("Internal Server Error");
    }
}