import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { TypeController } from "../controllers/TypeController";

const RouterType = Router();

// Adding Methods to the router
RouterType.post(
    "/create-type",
    HandleInputErros,
    TypeController.CreateType
)

RouterType.post(
    "/remove-type",
    HandleInputErros,
    TypeController.RemoveType
)


export default RouterType;