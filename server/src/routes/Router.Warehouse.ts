import { Router } from "express";
import { WarehouseController } from "../controllers/WarehouseController";
import { HandleInputErros } from "../middleware";

const RouterWarehouse = Router();

// Adding Methods to the router
RouterWarehouse.post(
    "/create-warehouse",
    HandleInputErros,
    WarehouseController.CreateWarehouse
)

RouterWarehouse.post(
    "/remove-warehouse",
    HandleInputErros,
    WarehouseController.RemoveWarehouse
)

RouterWarehouse.get(
    "/get-all-warehouses",
    HandleInputErros,
    WarehouseController.GetAllWarehouses
)

export default RouterWarehouse;