import type { Request, Response } from "express";
import Product from "../models/Product.models";
import Material from "../models/Material.model";
import Type from "../models/Group.models";

interface ProductSchema {
    Id: number
    Material: number
    Type: number
    Large: number
    Width: number
    Thickness: number
    MaterialInfo: Material
    TypeInfo: Type
}

interface CreateProductSchema {
    Material: string
    Type: string
    Large: number
    Width: number
    Thickness: number
}

interface RemoveProductSchema extends CreateProductSchema {

}

interface AddStockToProductSchema extends CreateProductSchema {
    Quantity: number
}

interface RemoveStockFromProductSchema extends AddStockToProductSchema {
}

export class SKUController {
    // Defining Inventory Controller Functions
    // Create Product
    static CreateProduct = async (req: Request, res: Response) => {
        try {
            // Structure The Request Schema
            const Request: CreateProductSchema = req.body

            // Get the list of materials and type 
            const MaterialList = await Material.findAll({ raw: true })
            const TypeList = await Type.findAll({ raw: true })

            // Check if the incoming types and materials exists
            const MaterialExists = MaterialList.some(material => material.Name.toLocaleLowerCase() === Request.Material.toLocaleLowerCase())
            if (!MaterialExists) {
                res.status(400).send({ error: "Material Does Not Exists" })
                return
            }

            const TypeExists = TypeList.some(type => type.Name.toLocaleLowerCase() === Request.Type.toLocaleLowerCase())
            if (!TypeExists) {
                res.status(400).send({ error: "Type Does Not Exists" })
                return
            }

            // Get The list of the actual products
            const ProductList: ProductSchema[] = await Product.findAll({
                include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Type,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = ProductList.find((product) =>
                product["MaterialInfo.Name"].toLocaleLowerCase() == Request.Material.toLocaleLowerCase() &&
                product["TypeInfo.Name"].toLocaleLowerCase() == Request.Type.toLocaleLowerCase() &&
                product.Large == Request.Large &&
                product.Width == Request.Width &&
                product.Thickness == Request.Thickness)

            if (matchingProduct) {
                res.status(400).send({ error: "Product Alredy Exists" })
                return
            }

            // If the Material and Type Exists and The Product does not, then we create the new product
            const NewProduct = new Product();

            // First we start by the dimensions
            NewProduct.Large = Request.Large
            NewProduct.Width = Request.Width
            NewProduct.Thickness = Request.Thickness
            NewProduct.Quantity = 0

            // Then we need to find the MaterialId/TypeID of the respective Material/Type
            const FoundMaterial = MaterialList.find(material => material.Name.toLocaleLowerCase() === Request.Material.toLocaleLowerCase())
            NewProduct.Material = FoundMaterial.Id

            const FoundType = TypeList.find(type => type.Name.toLocaleLowerCase() === Request.Type.toLocaleLowerCase())
            NewProduct.Type = FoundType.Id

            await Promise.allSettled([NewProduct.save()])
            res.status(200).send({ message: "Successfully Added New Product" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove Product
    static RemoveProduct = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RemoveProductSchema = req.body

            // Check If the Product Exists
            const ProductList: ProductSchema[] = await Product.findAll({
                include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Type,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = ProductList.find((product) =>
                product["MaterialInfo.Name"].toLocaleLowerCase() == Request.Material.toLocaleLowerCase() &&
                product["TypeInfo.Name"].toLocaleLowerCase() == Request.Type.toLocaleLowerCase() &&
                product.Large == Request.Large &&
                product.Width == Request.Width &&
                product.Thickness == Request.Thickness)

            if (!matchingProduct) {
                res.status(400).send({ error: "Product Does Not Exists" })
                return
            }

            // If the Product Actually exists then we remove it
            const ProductId = matchingProduct.Id
            await Promise.allSettled([Product.destroy({ where: { Id: ProductId } })])

            res.status(200).send({ message: "Successfully Removed Product" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Add Stock to Product
    static AddStockToProduct = async (req: Request, res: Response) => {
        try {
            // Structure the Request
            const Request: AddStockToProductSchema = req.body

            // Check If the Product Exists
            const ProductList: ProductSchema[] = await Product.findAll({
                include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Type,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = ProductList.find((product) =>
                product["MaterialInfo.Name"].toLocaleLowerCase() == Request.Material.toLocaleLowerCase() &&
                product["TypeInfo.Name"].toLocaleLowerCase() == Request.Type.toLocaleLowerCase() &&
                product.Large == Request.Large &&
                product.Width == Request.Width &&
                product.Thickness == Request.Thickness)

            if (!matchingProduct) {
                res.status(400).send({ error: "Product Does Not Exists" })
                return
            }

            // Retrive the Product of the database
            const FoundProduct = await Product.findOne({ where: { Id: matchingProduct.Id } })

            // Update the Quantity Attribute
            FoundProduct.Quantity = FoundProduct.Quantity + Request.Quantity

            await Promise.allSettled([FoundProduct.save()])

            res.status(200).send({ message: "Successfully Added Stock to the Product" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove Stock from Product
    static RemoveStockFromProduct = async (req: Request, res: Response) => {
        try {
            // Structure the Request
            const Request: RemoveStockFromProductSchema = req.body

            // Check If the Product Exists
            const ProductList: ProductSchema[] = await Product.findAll({
                include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Type,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = ProductList.find((product) =>
                product["MaterialInfo.Name"].toLocaleLowerCase() == Request.Material.toLocaleLowerCase() &&
                product["TypeInfo.Name"].toLocaleLowerCase() == Request.Type.toLocaleLowerCase() &&
                product.Large == Request.Large &&
                product.Width == Request.Width &&
                product.Thickness == Request.Thickness)

            if (!matchingProduct) {
                res.status(400).send({ error: "Product Does Not Exists" })
                return
            }

            // Retrive the Product of the database
            const FoundProduct = await Product.findOne({ where: { Id: matchingProduct.Id } })

            // Update the Quantity Attribute
            FoundProduct.Quantity = FoundProduct.Quantity + Request.Quantity

            await Promise.allSettled([FoundProduct.save()])

            res.status(200).send({ message: "Successfully Removed Stock From Product" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Get Product Information
    static GetProductsInformation = async (req: Request, res: Response) => {
        try {

            // Check If the Product Exists
            const ProductList: ProductSchema[] = await Product.findAll({
                include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Type,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })
            console.log(ProductList)
            res.status(200).send({
                message: "Success Queried Product List",
                data: ProductList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
}
