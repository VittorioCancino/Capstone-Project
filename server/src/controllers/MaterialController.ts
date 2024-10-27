import type { Request, Response } from "express";

export class MaterialController {
    // Defining Material Controller Functions
    // Create Material
    static CreateMaterial = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
    // Remove Material
    static RemoveMaterial = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Success" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

}
