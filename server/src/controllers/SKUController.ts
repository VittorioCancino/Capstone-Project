import type { Request, Response } from "express";

export class SKUController {
    // Defining Inventory Controller Functions
    // Create SKU
    static CreateSKU = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove SKU
    static RemoveSKU = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Add Stock to SKU
    static AddStockToSK = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove Stock from SKU
    static RemoveStockFromSKU = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Get SKU Information
    static GetSKUInformation = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
}
