import type { Request, Response } from "express";
import Product from "../models/Product.models";
import Material from "../models/Material.model";
import Group from "../models/Group.models";

// EXTERNAL FUNCTIONS
// Materials Functions
import { CheckMaterial } from "./MaterialController";
import { FindMaterial } from "./MaterialController";

// Group Functions
import { CheckGroup } from "./GroupController";
import { FindGroup } from "./GroupController";

// INTERFACES
export interface ProductSchema {
    Id: number
    MaterialId: number
    GroupId: number
    Large: number
    Width: number
    Thickness: number
    MaterialInfo: Material
    GroupInfo: Group
}

interface CreateProductSchema {
    MaterialName: string
    GroupName: string
    ProductLarge: number
    ProductWidth: number
    ProductThickness: number
}

interface RemoveProductSchema extends CreateProductSchema {
}

interface AddStockToProductSchema extends CreateProductSchema {
    Quantity: number
}

interface RemoveStockFromProductSchema extends AddStockToProductSchema {
}

// FUNCTIONS
// FindProduct: Find a Product in a ProductList
export function FindProduct(MaterialName: String, GroupName: String, ProductLarge: Number, ProductWidth: Number, ProductThickness: Number, ProductList: ProductSchema[]) {
    return ProductList.find((product) =>
        product["MaterialInfo.Name"].toLocaleLowerCase() == MaterialName.toLocaleLowerCase() &&
        product["GroupInfo.Name"].toLocaleLowerCase() == GroupName.toLocaleLowerCase() &&
        product.Large == ProductLarge &&
        product.Width == ProductWidth &&
        product.Thickness == ProductThickness)
}

export class ProductController {
    // Defining Inventory Controller Functions
    // Create Product
    static CreateProduct = async (req: Request, res: Response) => {
        try {
            // Structure The Request Schema
            const Request: CreateProductSchema = req.body

            // Get the list of materials and group 
            const MaterialList = await Material.findAll({ raw: true })
            const GroupList = await Group.findAll({ raw: true })

            // Check if the incoming types and materials exists
            const MaterialExists = CheckMaterial(Request.MaterialName, MaterialList)
            if (!MaterialExists) {
                res.status(400).send({ error: "Material Does Not Exists" })
                return
            }

            const GroupExists = CheckGroup(Request.GroupName, GroupList)
            if (!GroupExists) {
                res.status(400).send({ error: "Group Does Not Exists" })
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
                        model: Group,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = FindProduct(Request.MaterialName, Request.GroupName, Request.ProductLarge, Request.ProductWidth, Request.ProductThickness, ProductList)

            if (matchingProduct) {
                res.status(400).send({ error: "Product Alredy Exists" })
                return
            }

            // If the Material and Group Exists and The Product does not, then we create the new product
            const NewProduct = new Product();

            // First we start by the dimensions
            NewProduct.Large = Request.ProductLarge
            NewProduct.Width = Request.ProductWidth
            NewProduct.Thickness = Request.ProductThickness
            NewProduct.Quantity = 0

            // Then we need to find the MaterialId/TypeID of the respective Material/Group
            const FoundMaterial = FindMaterial(Request.MaterialName, MaterialList)
            NewProduct.MaterialId = FoundMaterial.Id

            const FoundGroup = FindGroup(Request.GroupName, GroupList)
            NewProduct.GroupId = FoundGroup.Id
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
                        model: Group,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = FindProduct(Request.MaterialName, Request.GroupName, Request.ProductLarge, Request.ProductWidth, Request.ProductThickness, ProductList)

            if (!matchingProduct) {
                res.status(400).send({ error: "Product Does Not Exists" })
                return
            }

            // If the Product Actually exists then we remove it
            const ProductId = matchingProduct.Id
            await Promise.allSettled([Product.destroy({ where: { Id: ProductId } })])

            res.status(200).send({ message: "Successfully Removed Product" })

        } catch (error) {
            console.log(error)
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
                        model: Group,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = FindProduct(Request.MaterialName, Request.GroupName, Request.ProductLarge, Request.ProductWidth, Request.ProductThickness, ProductList)

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
                        model: Group,
                        attributes: ['Id', 'Name']
                    }
                ],
                raw: true
            })

            const matchingProduct: ProductSchema = FindProduct(Request.MaterialName, Request.GroupName, Request.ProductLarge, Request.ProductWidth, Request.ProductThickness, ProductList)

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
                        attributes: ['Name']
                    },
                    {
                        model: Group,
                        attributes: ['Name']
                    }
                ],
                raw: true
            })
            res.status(200).send({
                message: "Success Queried Product List",
                data: ProductList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
}
