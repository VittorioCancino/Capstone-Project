import type { Request, Response } from "express";
import Warehouse from "../models/Warehouse.model";

// INTERFACES
export interface WarehouseSchema {
    Id: number,
    Name: string,
    Address: string,
    Manager: string,
    Phone: string,
    Email: string,
    Schedule: string
}

interface CreateWarehouseSchema {
    WarehouseName: string,
    WarehouseAdress: string,
    WarehouseManager: string,
    WarehousePhone: string,
    WarehouseEmail: string
    WarehouseSchedule: string
}

interface RemoveWarehouseSchema {
    WarehouseName: string
}

// FUNCTIONS
export function CheckWarehouse(Warehouse: String, WarehouseList: WarehouseSchema[]) {
    return WarehouseList.some(warehouse => warehouse.Name.toLocaleLowerCase() === Warehouse.toLocaleLowerCase())
}

export function FindWarehouse(Warehouse: String, WarehouseList: WarehouseSchema[]) {
    return WarehouseList.find(warehouse => warehouse.Name.toLocaleLowerCase() === Warehouse.toLocaleLowerCase())
}

export class WarehouseController {
    static CreateWarehouse = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: CreateWarehouseSchema = req.body

            // Check if the Warehouse alredy exists
            const WarehouseList: WarehouseSchema[] = await Warehouse.findAll({
                raw: true
            })

            const WarehouseExists = CheckWarehouse(Request.WarehouseName, WarehouseList)
            if (WarehouseExists) {
                res.status(400).send({ error: "Warehouse Alredy Exists" })
                return
            }

            // Create and save the new Warehouse
            const NewWarehouse = new Warehouse();
            NewWarehouse.Name = Request.WarehouseName;
            NewWarehouse.Address = Request.WarehouseAdress;
            NewWarehouse.Manager = Request.WarehouseManager;
            NewWarehouse.Phone = Request.WarehousePhone;
            NewWarehouse.Email = Request.WarehouseEmail;
            NewWarehouse.Schedule = Request.WarehouseSchedule;

            await Promise.allSettled([NewWarehouse.save()])
            res.status(200).send({ message: "Warehouse Successfully Created" })

        } catch (error) {
            console.log(error)
            res.status(500).send({ error: "Internal Server Error" })
        }

    }

    static RemoveWarehouse = async (req: Request, res: Response) => {
        try {
            // Structure the Request
            const Request: RemoveWarehouseSchema = req.body

            const WarehouseList: WarehouseSchema[] = await Warehouse.findAll({ raw: true })
            const WarehouseExists = CheckWarehouse(Request.WarehouseName, WarehouseList)
            if (!WarehouseExists) {
                res.status(400).send({ error: "Warehouse Does Not Exists" });
            }

            // Structure the found Warehouse
            const RemoveWarehouse = FindWarehouse(Request.WarehouseName, WarehouseList)
            await Promise.allSettled([Warehouse.destroy({ where: { Id: RemoveWarehouse.Id } })])
            res.status(200).send({ message: "Warehouse Successfully Remove" })

        } catch (error) {
            console.log(error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    }

    static GetAllWarehouses = async (req: Request, res: Response) => {
        try {
            const WarehouseList: WarehouseSchema[] = await Warehouse.findAll({ raw: true })
            res.status(200).send({
                message: "Warehouses Queried Successfully",
                data: WarehouseList
            })
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" })
        }

    }
}