import type { Request, Response } from "express";
import Group from "../models/Group.models";

// INTERFACES
interface GroupSchema {
    Id: number
    Name: string
}

interface RequestSchema {
    GroupName: string
}

// FUNCTIONS
// CheckGroup: Check if a Group exist in a Grouplist
export function CheckGroup(Group: String, GroupList: GroupSchema[]) {
    return GroupList.some(type => type.Name.toLocaleLowerCase() === Group.toLocaleLowerCase())
}

// FindGroup: Find a Group in a Grouplist
export function FindGroup(Group: String, GroupList: GroupSchema[]) {
    return GroupList.find(type => type.Name.toLocaleLowerCase() === Group.toLocaleLowerCase())
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
            const GroupExists = CheckGroup(Request.GroupName, GroupList)
            if (GroupExists) {
                res.status(400).send({ error: "Group Alredy Exists" })
                return
            }

            // Create and save the new Group
            const newType = new Group();
            newType.Name = Request.GroupName
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
            const GroupExists = CheckGroup(Request.GroupName, GroupList)
            if (!GroupExists) {
                res.status(400).send({ error: "Group Does Not Exists" })
                return
            }

            // Structure the found Group
            const RemoveGroup = FindGroup(Request.GroupName, GroupList)
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
