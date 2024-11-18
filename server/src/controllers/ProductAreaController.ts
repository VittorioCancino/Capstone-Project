import type { Request, Response } from "express";
import Area from "../models/Area.models";
import Product from "../models/Product.models";
import ProductArea from "../models/ProductArea.model";
import Material from "../models/Material.model";
import Group from "../models/Group.models";
import Stock from "../models/Stock.model";

// INTERFACES
interface ProductAreaSchema {
    Id: number,
    ProductId: number,
    AreaId: number,
    UID: string
}

interface CreateProductAreaSchema {
    ProductId: number,
    AreaId: number,
}

interface RemoveProductAreaSchema {
    ProductAreaId: number
}

// FUNCTIONS

function CheckProductArea(ProductAreaId: number, ProductAreaList: ProductAreaSchema[]) {
    return ProductAreaList.some(productarea => productarea.Id === ProductAreaId)
}

function FindProductArea(ProductAreaId: number, ProductAreaList: ProductAreaSchema[]) {
    return ProductAreaList.find(productArea => productArea.Id === ProductAreaId)
}


export class ProductAreaController {
    static CreateProductArea = async (req: Request, res: Response) => {
        try {
            // Structure the Request
            const Request: CreateProductAreaSchema = req.body

            // Check if the Area Exists
            const AreaExist: Area = await Area.findOne({ where: { Id: Request.AreaId } })
            if (!AreaExist) {
                res.status(400).send({ error: "Area Does Not Exists" })
                return
            }

            // Check if the product Exists
            const ProductExist = await Product.findOne({
                where: { Id: Request.ProductId }, raw: true, include: [
                    {
                        model: Material,
                        attributes: ['Id', 'Name']
                    },
                    {
                        model: Group,
                        attributes: ['Id', 'Name']
                    }
                ]
            })
            if (!ProductExist) {
                res.status(400).send({ error: "Product Does Not Exists" })
                return
            }

            // Create the ProductArea Linkeage
            const NewProductArea = new ProductArea();
            NewProductArea.AreaId = Request.AreaId;
            NewProductArea.ProductId = Request.ProductId;

            // We will create the UID of the ProductArea With the Name of the area and Product
            NewProductArea.UID = AreaExist.Name + ProductExist["MaterialInfo.Name"] + ProductExist["GroupInfo.Name"] + "/" + AreaExist.Id + "/" + ProductExist.Id

            // We will check if there is alredy a ProductArea Linkeage created for this Product and Area using the UID
            const ProductAreaExists = await ProductArea.findOne({ where: { UID: NewProductArea.UID } })
            if (ProductAreaExists) {
                res.status(400).send({ error: "Product Area alredy Exists" })
                return
            }

            await Promise.allSettled([NewProductArea.save()])

            // We will initialize the stock of the Linkeage at 0 
            const NewStock = new Stock();
            NewStock.Quantity = 0;
            NewStock.ProductAreaId = NewProductArea.Id

            await Promise.allSettled([NewStock.save()])

            res.status(200).send({ message: "Stock Successfully Created" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static RemoveProductArea = async (req: Request, res: Response) => {
        try {
            // Structure the Request
            const Request: RemoveProductAreaSchema = req.body

            // Check if the ProductArea Exists
            const ProductAreaList: ProductAreaSchema[] = await ProductArea.findAll({ raw: true })
            const ProductAreaExists = CheckProductArea(Request.ProductAreaId, ProductAreaList)

            if (!ProductAreaExists) {
                res.status(400).send({ error: "Product Area Does Not Exists" })
                return
            }

            // We retrieve the Product Area
            const CurrentProductArea = FindProductArea(Request.ProductAreaId, ProductAreaList)
            await Promise.allSettled([ProductArea.destroy({ where: { Id: CurrentProductArea.Id } })])
            res.status(200).send({ message: "Product Area Successfully Removed" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllProductAreas = async (req: Request, res: Response) => {
        try {
            const ProductAreasList = await ProductArea.findAll({ raw: true })
            res.status(200).send({
                message: "Product Areas Queried Successfully",
                data: ProductAreasList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })

        }
    }
}
