import { Router } from "express";
import { ProductAreaController } from "../controllers/ProductAreaController";
import { HandleInputErros } from "../middleware";

const RouterProductArea = Router();

// Adding Methods to the router
RouterProductArea.post(
    "/create-product-area",
    HandleInputErros,
    ProductAreaController.CreateProductArea
)

RouterProductArea.post(
    "/remove-product-area",
    HandleInputErros,
    ProductAreaController.RemoveProductArea
)

RouterProductArea.get(
    "/get-all-product-areas",
    HandleInputErros,
    ProductAreaController.GetAllProductAreas
)

export default RouterProductArea;