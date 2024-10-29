import { Router } from "express";
import { SKUController } from "../controllers/ProductController";
import { HandleInputErros } from "../middleware";

const RouterProduct = Router();

// Adding Methods to the router
RouterProduct.post(
    "/create-product",
    HandleInputErros,
    SKUController.CreateProduct
)

RouterProduct.post(
    "/remove-product",
    HandleInputErros,
    SKUController.RemoveProduct
)

RouterProduct.post(
    "/add-stock-product",
    HandleInputErros,
    SKUController.AddStockToProduct
)

RouterProduct.post(
    "/remove-stock-product",
    HandleInputErros,
    SKUController.RemoveStockFromProduct
)

RouterProduct.get(
    "/get-products-information",
    HandleInputErros,
    SKUController.GetProductsInformation
)

export default RouterProduct;