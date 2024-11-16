import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { GroupController } from "../controllers/GroupController";

const RouterGroup = Router();

// Adding Methods to the router
RouterGroup.post(
    "/create-group",
    HandleInputErros,
    GroupController.CreateGroup
)

RouterGroup.post(
    "/remove-group",
    HandleInputErros,
    GroupController.RemoveGroup
)

RouterGroup.get(
    "/get-all-groups",
    HandleInputErros,
    GroupController.GetAllGroups
)

export default RouterGroup;