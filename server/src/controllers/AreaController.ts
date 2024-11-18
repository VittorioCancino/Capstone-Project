import type { Request, Response } from "express";
import Area from "../models/Area.models";
import Warehouse from "../models/Warehouse.model";

// EXTERNAL INTERFACES
import { WarehouseSchema } from "./WarehouseController";

// EXTERNAL FUNCTIONS
import { CheckWarehouse, FindWarehouse } from "./WarehouseController";

// INTERFACES
export interface AreaSchema {
    Id: number,
    WarehouseId: number,
    Name: string
}

interface CreateAreaSchema {
    AreaName: string,
    WarehouseName: string,

}

interface RemoveAreaSchema extends CreateAreaSchema {

}

// FUNCTIONS
export function CheckArea(Area: string, WarehouseId: number, AreaList: AreaSchema[]) {
    return AreaList.some(area =>
        area.Name.toLocaleLowerCase() === Area.toLocaleLowerCase() &&
        area.WarehouseId == WarehouseId
    )
}

export function FindArea(Area: string, WarehouseId: number, AreaList: AreaSchema[]) {
    return AreaList.find(area =>
        area.Name.toLocaleLowerCase() === Area.toLocaleLowerCase() &&
        area.WarehouseId == WarehouseId
    )

}

export class AreaController {
    static CreateArea = async (req: Request, res: Response) => {
        try {
            // Structure the request
            const Request: CreateAreaSchema = req.body

            // Check if the Warehouse where the area is gonna be placed exists
            const WarehouseList: WarehouseSchema[] = await Warehouse.findAll({ raw: true })
            const WarehouseExists = CheckWarehouse(Request.WarehouseName, WarehouseList)

            if (!WarehouseExists) {
                res.status(400).send({ error: "The Warehouse where the area is going to be created do not exists" })
                return
            }

            // Retrive and structure the Warehouse were the area is gonna be placed
            const CurrentWarehouse = FindWarehouse(Request.WarehouseName, WarehouseList)

            // With the Warehouse Id we can check if there is an alredy existing area inside that Warehouse
            const AreaList = await Area.findAll({ raw: true })
            const AreaExist = CheckArea(Request.AreaName, CurrentWarehouse.Id, AreaList)
            if (AreaExist) {
                res.status(400).send({ error: "The Area alredy Exists" })
                return
            }

            // We create the New Area
            const NewArea = new Area();
            NewArea.Name = Request.AreaName
            NewArea.WarehouseId = CurrentWarehouse.Id;

            // Save the new area
            await Promise.allSettled([NewArea.save()])
            res.status(200).send({ error: "Area Succesfully Created" })


        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static RemoveArea = async (req: Request, res: Response) => {
        try {
            // We structure the Request
            const Request: RemoveAreaSchema = req.body

            // Retrieve the Warehouse Id to remove the exact area
            const WarehouseList: WarehouseSchema[] = await Warehouse.findAll({ raw: true })
            const CurrentWarehouse = FindWarehouse(Request.WarehouseName, WarehouseList)

            // Find the area
            const AreaList: AreaSchema[] = await Area.findAll({ raw: true })
            const RemoveArea = FindArea(Request.AreaName, CurrentWarehouse.Id, AreaList)

            if (!RemoveArea) {
                res.status(400).send({ error: "The Area Does Not Exists" })
                return
            }

            // Remove the area
            await Promise.allSettled([Area.destroy({ where: { Id: RemoveArea.Id } })])
            res.status(200).send({ message: "Area Successfully Removed" })

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllAreas = async (req: Request, res: Response) => {
        try {
            const AreaList: AreaSchema[] = await Area.findAll({ raw: true })
            res.status(200).send({
                message: "Areas Queried Successfully",
                data: AreaList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }

    }

}