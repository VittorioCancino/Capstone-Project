import { Router } from "express";
import { AreaController } from "../controllers/AreaController";
import { HandleInputErros } from "../middleware";

const RotuerArea = Router();

// Adding Methods to the router
RotuerArea.post(
    "/create-area",
    HandleInputErros,
    AreaController.CreateArea
)

RotuerArea.post(
    "/remove-area",
    HandleInputErros,
    AreaController.RemoveArea
)

RotuerArea.get(
    "/get-all-areas",
    HandleInputErros,
    AreaController.GetAllAreas
)

export default RotuerArea;