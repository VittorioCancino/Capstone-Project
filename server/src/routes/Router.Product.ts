import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { HandleInputErros } from "../middleware";

const RouterProduct = Router();

// Adding Methods to the router
RouterProduct.post(
    "/create-product",
    HandleInputErros,
    ProductController.CreateProduct
)

RouterProduct.post(
    "/remove-product",
    HandleInputErros,
    ProductController.RemoveProduct
)

RouterProduct.post(
    "/add-stock-product",
    HandleInputErros,
    ProductController.AddStockToProduct
)

RouterProduct.post(
    "/remove-stock-product",
    HandleInputErros,
    ProductController.RemoveStockFromProduct
)

RouterProduct.get(
    "/get-products-information",
    HandleInputErros,
    ProductController.GetProductsInformation
)

export default RouterProduct;