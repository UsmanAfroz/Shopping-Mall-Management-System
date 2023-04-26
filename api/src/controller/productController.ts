import { Request, Response } from "express";
import { product, deleteProduct, addProducts, update, getSingleProduct, getSingleProductId } from "../services/product_Service";
import { IProducts } from "../interfaces/products";
import { uploadImage } from "../s3";
import { Body } from "aws-sdk/clients/s3";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productData = await product();
        return res.send({ statusCode: 200, data: productData })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const getProductByID = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!id) return res.send({ message: "ID is required in parameters", statusCode: 500 })
    try {
        const product = await getSingleProduct(id);
        return res.send({ statusCode: 200, data: product })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}


export const getUserProducts = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!id) return res.send({ message: "ID is required in parameters", statusCode: 500 })
    try {
        const product = await getSingleProduct(id);
        return res.send({ statusCode: 200, data: product })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const getProductwithPk = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!id) return res.send({ message: "ID is required in parameters", statusCode: 500 })
    try {
        const product = await getSingleProductId(id);
        return res.send({ statusCode: 200, data: product })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}


export const editProduct = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const file = req.file;
    const productData: IProducts = req.body;
    if (!id) return res.send({ message: "ID is required in parameters", statusCode: 500 })
    try {
        if (req.file) {
            productData.images = file?.filename; // update the image filename/path
        }
        await update(id, productData);
        return res.send({ message: "data updated successfully", statusCode: 200 })

    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const file = req.files;
    if (!file) {
        const error = new Error('Please upload a file');
        console.log(error)
    }

    const productData: IProducts = req.body;
    let images: Array<string> = []

    if (Array.isArray(file)) {
        file.forEach(e => {
            images.push(e.filename)
        });
    }

    productData.images = images;


    try {
        const product = await addProducts(productData);
        return res.send({ statusCode: 200, data: product })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    const data: IProducts = req.body;
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

export const delProduct = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    if (!id) {
        return res.send({ message: "ID is required in parameters", statusCode: 500 })
    }
    try {
        await deleteProduct(id);
        return res.send({ message: "product deleted successfully", statsCode: 200 })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}