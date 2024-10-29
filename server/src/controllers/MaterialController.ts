import type { Request, Response } from "express";
import Material from "../models/Material.model";

interface MaterialSchema {
    Id: number
    Name: string
}

interface RequestSchema {
    Name: string
}

export class MaterialController {
    // Defining Material Controller Functions
    // Create Material
    static CreateMaterial = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body;

            // Find all Materials
            const MaterialList: MaterialSchema[] = await Material.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Material alredy Exists
            const MaterialExists = MaterialList.some(material => material.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (MaterialExists) {
                res.status(400).send({ error: "Material Alredy Exists" })
                return
            }

            // Create and save the new Material
            const newMaterial = new Material();
            newMaterial.Name = Request.Name
            await Promise.allSettled([newMaterial.save()])
            res.status(200).send({ message: "Material Successfully Created" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }
    // Remove Material
    static RemoveMaterial = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body

            // Find all Types
            const MaterialList: MaterialSchema[] = await Material.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Material alredy Exists
            const MaterialExists = MaterialList.some(material => material.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (!MaterialExists) {
                res.status(400).send({ error: "Material Does Not Exists" })
                return
            }

            // Structure the found Material
            const RemoveType = MaterialList.find(material => material.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            await Promise.allSettled([Material.destroy({ where: { Id: RemoveType.Id } })])
            res.status(200).send({ message: "Material Successfully Removed" })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllMaterials = async (req: Request, res: Response) => {
        try {
            // Get All Materials List
            const MaterialList: MaterialSchema[] = await Material.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // Send All Materials List
            res.status(200).send({
                message: "Material List Successfully Queried",
                data: MaterialList
            })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }

    }

}
