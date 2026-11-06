import type { Request, Response } from "express";
import {
    getAllProducts,
    getProductById,
    insertProduct,
    updateProduct as updateProductModel
} from "../models/product.model.js";

export async function getMenu(req: Request, res: Response) {

/*#swagger.tags = ['Products']
  #swagger.summary = 'Consultar todos los productos' */

    try {
        const products = await getAllProducts();

        res.json(products); 

    } catch (error){
        console.log(error);

        res.status(500).json({
            error: "Error al consultar los productos"
        });
    }
}

export async function getProduct(req: Request, res: Response) {

/*#swagger.tags = ['Products']
  #swagger.summary = 'Consultar un producto por ID' */

    try {
        const { id } = req.params;
        const productId = Number(id);

        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al consultar el producto"
        });
    }
}

export async function createProduct(req: Request, res: Response) {

/*#swagger.tags = ['Products']
  #swagger.summary = 'Crear un producto' */

    try {
        const { name, description, price } = req.body;

        const product = await insertProduct(name, description, price);

        res.status(201).json(product);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al crear el producto"
        });
    }
}

export async function updateProduct(req: Request, res: Response) {

/*#swagger.tags = ['Products']
  #swagger.summary = 'Actualizar un producto' */

    try {
        const { id } = req.params;
        const productId = Number(id);

        const { name, description, price } = req.body;

        const product = await updateProductModel(
            productId,
            name,
            description,
            price
        );

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Error al actualizar el producto"
        });
    }
}