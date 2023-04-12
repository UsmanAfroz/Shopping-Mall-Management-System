import { Request, Response } from "express";
import { addCart, deleteCart, update, getCartbyId,addTemp ,getTemp,deleteTemp} from "../services/cart_Service";
import { ICart } from '../interfaces/cart';
import { IOrder } from "../interfaces/order";
import { Cart } from "../models/cart";
import { updateOrder, createOrder } from "../services/order_Service";
import { Body } from "aws-sdk/clients/s3";

export const getCartlist = async (req: Request, res: Response) => {
    try {
        const orderList = await Cart.find().populate('user', 'personalInformation');
        return res.send({ statusCode: 200, data: orderList })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}




export const getCartItemById = async (req: Request, res: Response) => {
    const userId = req?.body.orderId;
    try {
        const cartList = await getCartbyId(userId);
        res.send({ statusCode: 200, data: cartList })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const createCart = async (req: Request, res: Response) => {
    const orderItemsIds: any = Promise.all(req.body.orderItems.map(async (e: IOrder) => {
        const orderObject = {
            product: e.product,
            quantity: e.quantity
        }
        const newOrderItem = await createOrder(orderObject);
        return newOrderItem._id;
    }))
    const cart: ICart = req.body;
    cart.orderItems = await orderItemsIds;
    try {
        const carts = await addCart(cart);
        return res.send({ statusCode: 200, data: carts })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const updateCart = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    const data: ICart = req.body;
    const orderItemsIds: any = Promise.all(req.body.orderItems.map(async (e: IOrder) => {
        const orderObject = {
            product: e.product,
            quantity: e.quantity
        }
        const updated = await updateOrder(req.body.orderId, orderObject);
        return updated;
    }))
    const cart: ICart = req.body;
    cart.orderItems = await orderItemsIds;

    if (!id || !data) {
        return res.send({ message: "ID is required in parameters", statusCode: 500 })
    }
    try {
        await update(id, data);
        return res.send({ message: "data updated successfully", statusCode: 200 })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const delCart = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    if (!id) {
        return res.send({ message: "ID is required in parameters", statusCode: 500 })
    }
    try {
        await deleteCart(id);
        return res.send({ message: "cart deleted successfully", statsCode: 200 })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}


export const createTemp = async (req: Request, res: Response) => {
    
    const {_id,uid}:any = req.body;
    const data:any = req.body;
   
    try {
        const product = await addTemp(_id,uid,data);
        return res.send({ statusCode: 200, data: product })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}


export const getTempData = async(req:Request,res:Response) => {
    const uid: any = req.query.uid;
    try{
      const data = await getTemp(uid)
      return res.send({ statusCode: 200, data: data })
    }catch(err:any){
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const deleteTempData = async(req:Request,res:Response) => {
    const id: any = req.params.id;
    try{
      console.log('id',id)  
      const data = await deleteTemp(id)
      return res.send({ statusCode: 200, data: data })
    }catch(err:any){
        return res.send({ statusCode: 500, message: err?.message })
    }
}