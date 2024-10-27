import { Router } from "express";
import { SKUController } from "../controllers/SKUController";
import { HandleInputErros } from "../middleware";

const RouterSKU = Router();

// Adding Methods to the router
RouterSKU.post(
    "/create-sku",
    HandleInputErros,
    SKUController.CreateSKU
)

RouterSKU.post(
    "/remove-sku",
    HandleInputErros,
    SKUController.RemoveSKU
)

RouterSKU.post(
    "/add-stock-sku",
    HandleInputErros,
    SKUController.AddStockToSK
)

RouterSKU.post(
    "/remove-stock-sku",
    HandleInputErros,
    SKUController.RemoveStockFromSKU
)

RouterSKU.post(
    "/get-sku-information",
    HandleInputErros,
    SKUController.GetSKUInformation
)

export default RouterSKU;