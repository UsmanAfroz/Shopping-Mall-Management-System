import { Products } from '../models/products';
import { IProducts } from '../interfaces/products';

export const product = async () => {
  const product = await Products.find();
  return product;
};

export const getSingleProduct = async (id: string) => {
  const product = await Products.find({ pid: id });
  if (!product) return 'no product found ';
  return product;
};

export const getSingleProductId = async (id: string) => {
  const product = await Products.findById({ _id: id });
  if (!product) return 'no product found ';
  return product;
};

export const addProducts = async (productData: IProducts) => {
  const product = new Products(productData);
  await product.save();
  return product;
};

export const update = async (id: any, data: IProducts) => {
  const updated = await Products.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        Price: data.Price,
        brandName: data.brandName,
        category: data.category,
        deliveryTime: data.deliveryTime,
        description: data.description,
        sizes: data.sizes,
        status: data.status,
        title: data.title,
        images: data.images,
      },
    },
  );

  return updated;
};

export const deleteProduct = async (id: any) => {
  const del = await Products.findByIdAndDelete({ _id: id });
  return del;
};

export const getShopKeeperProducts = async (id: string) => {
  const shop = await Products.find({ 'pid': id })
  if (!shop) return 'no Shop found ';
  return shop;
}