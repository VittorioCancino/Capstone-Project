import type { Request, Response } from "express";
import Group from "../models/Group.models";

interface GroupSchema {
    Id: number
    Name: string
}

interface RequestSchema {
    Name: string
}

export class GroupController {
    // Defining Group Controller Functions
    // Create Group
    static CreateGroup = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body;

            // Find all Types
            const GroupList: GroupSchema[] = await Group.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Group alredy Exists
            const GroupExists = GroupList.some(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (GroupExists) {
                res.status(400).send({ error: "Group Alredy Exists" })
                return
            }

            // Create and save the new Group
            const newType = new Group();
            newType.Name = Request.Name
            await Promise.allSettled([newType.save()])
            res.status(200).send({ message: "Group Successfully Created" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    // Remove Group
    static RemoveGroup = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RequestSchema = req.body

            // Find all Types
            const GroupList: GroupSchema[] = await Group.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // See if the Requested Group alredy Exists
            const GroupExists = GroupList.some(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            if (!GroupExists) {
                res.status(400).send({ error: "Group Does Not Exists" })
                return
            }

            // Structure the found Group
            const RemoveGroup = GroupList.find(type => type.Name.toLocaleLowerCase() === Request.Name.toLocaleLowerCase())
            await Promise.allSettled([Group.destroy({ where: { Id: RemoveGroup.Id } })])
            res.status(200).send({ message: "Group Successfully Removed" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllGroups = async (req: Request, res: Response) => {
        try {

            // Get all Types List
            const GroupList: GroupSchema[] = await Group.findAll({
                attributes: ['Id', 'Name'],
                raw: true
            });

            // Send All Types List
            res.status(200).send({
                message: "Group List Successfully Queried",
                data: GroupList
            })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

}
