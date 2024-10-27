import type { Request, Response } from "express";

export class TypeController {
    // Defining Type Controller Functions
    // Create Type
    static CreateType = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
    // Remove Type
    static RemoveType = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

}
