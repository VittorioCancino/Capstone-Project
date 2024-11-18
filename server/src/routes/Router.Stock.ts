import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { StockController } from "../controllers/StockController";

const RouterStock = Router();

// Adding Methods to the router
RouterStock.post(
    "/add-stock",
    HandleInputErros,
    StockController.AddStock
)

RouterStock.post(
    "/remove-stock",
    HandleInputErros,
    StockController.ReduceStock
)


RouterStock.get(
    "/get-all-stocks",
    HandleInputErros,
    StockController.GetAllStocks
)


export default RouterStock;