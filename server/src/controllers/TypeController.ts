import type { Request, Response } from "express";
import Type from "../models/Type.models";

interface TypeSchema {
    Id: number
    Name: string
}

interface RequestSchema {
    Name: string
}

export class TypeController {
    // Defining Type Controller Functions
    // Create Type
    static CreateType = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body;

            // Find all Types
            const TypeList: TypeSchema[] = await Type.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Type alredy Exists
            const TypeExists = TypeList.some(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (TypeExists) {
                res.status(400).send({ error: "Type Alredy Exists" })
                return
            }

            // Create and save the new Type
            const newType = new Type();
            newType.Name = Request.Name
            await Promise.allSettled([newType.save()])
            res.status(200).send({ message: "Type Successfully Created" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove Type
    static RemoveType = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body

            // Find all Types
            const TypeList: TypeSchema[] = await Type.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Type alredy Exists
            const TypeExists = TypeList.some(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (!TypeExists) {
                res.status(400).send({ error: "Type Does Not Exists" })
                return
            }

            // Structure the found Type
            const RemoveType = TypeList.find(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            await Promise.allSettled([Type.destroy({ where: { Id: RemoveType.Id } })])
            res.status(200).send({ message: "Type Successfully Removed" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllTypes = async (req: Request, res: Response) => {
        try {

            // Get all Types List
            const TypeList: TypeSchema[] = await Type.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // Send All Types List
            res.status(200).send({
                message: "Type List Successfully Queried",
                data: TypeList
            })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

}
