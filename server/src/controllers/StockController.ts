import type { Request, Response } from "express"
import Stock from "../models/Stock.model"
// INTERFACES
interface StockSchema {
    Id: number
    ProductAreaId: number
    Quantity: number
}

interface AddStockSchema {
    StockId: number
    Quantity: number
}

interface ReduceStock extends AddStockSchema { }

export class StockController {
    static AddStock = async (req: Request, res: Response) => {
        try {
            const Request: AddStockSchema = req.body
            const CurrentStock = await Stock.findOne({ where: { Id: Request.StockId } })

            if (!CurrentStock) {
                res.status(400).send({ error: "Stock Does Not Exists" })
                return
            }

            CurrentStock.Quantity += Request.Quantity

            await Promise.allSettled([CurrentStock.save()])
            res.status(200).send({ message: "Stock Successfully Added" })


        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })

        }
    }

    static ReduceStock = async (req: Request, res: Response) => {
        try {
            const Request: ReduceStock = req.body
            const CurrentStock = await Stock.findOne({ where: { Id: Request.StockId } })

            if (!CurrentStock) {
                res.status(400).send({ error: "Stock Does Not Exists" })
                return
            }

            CurrentStock.Quantity -= Request.Quantity

            await Promise.allSettled([CurrentStock.save()])
            res.status(200).send({ message: "Stock Successfully Reduce" })


        } catch (error) {
            console.log(error)
            res.status(500).send({ error: "Internal Server Error" })

        }
    }

    static GetAllStocks = async (req: Request, res: Response) => {
        try {
            const StocksList = await Stock.findAll({ raw: true })
            res.status(200).send({
                message: "Stocks Queried Successfully",
                data: StocksList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })

        }
    }
}