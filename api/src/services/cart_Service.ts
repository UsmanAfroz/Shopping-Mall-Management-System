import { Cart } from '../models/cart';
import { ICart } from '../interfaces/cart';

import {Temp} from '../models/tempCart';

export const getCartItems = async () => {
    const cart = await Cart.find();
    return cart;
}

export const getCartbyId = async(cartId: any) =>{
    const items = await Cart.findById(cartId);
    if(!items) return 'No Cart Items present';
    return items;
}

export const addCart = async (cartData: ICart) => {
    const cart = new Cart(cartData);
    await cart.save();
    return cart;
}

export const update = async (id: any, data: ICart) => {
    const updated = await Cart.findOneAndUpdate({ 'id': id },
        {
            $set: {
                'Address': data.Address,
                'city': data.city,
                'dateOrdered': data.dateOrdered,
                'orderItems': data.orderItems,
                'phone': data.phone,
                'shopId': data.shopId,
                'status': data.status,
                'totalItems': data.totalItems,
                'totalPrice': data.totalPrice,
                'user': data.user,
                'zip': data.zip,
            }
        });
    return updated;
}

export const deleteCart = async (id: any) => {
    const del = await Cart.findByIdAndDelete({ '_id': id });
    return del;
}


export const addTemp = async (id:String,uid:String,productData: Object) => {
   
    const ob = await Temp.updateMany(
        {'_id':id,'uid':uid},
        { $inc: { count: 1 } }
        );

    if(ob.matchedCount != 0){
      
       return ob;
    }else{
        const product = new Temp(productData);
        await product.save();
        return product;
    }
   
}


export const getTemp = async (uid:String) => {
   
    const data = await Temp.find({'uid':uid});
     return data;
   
}

export const deleteTemp = async(id:any)=>{
    console.log('id',id)  
    const data = await Temp.findByIdAndDelete({ '_id': id });
    return data;
}
