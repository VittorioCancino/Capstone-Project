import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { MaterialController } from "../controllers/MaterialController";

const RouterMaterial = Router();

// Adding Methods to the router
RouterMaterial.post(
    "/create-material",
    HandleInputErros,
    MaterialController.CreateMaterial
)

RouterMaterial.post(
    "/remove-material",
    HandleInputErros,
    MaterialController.RemoveMaterial
)


export default RouterMaterial;