import express from "express";
import db from "./config/db";
import RouterProduct from "./routes/Router.Product";
import RouterGroup from "./routes/Router.Group";
import RouterMaterial from "./routes/Router.Material";
import RouterWarehouse from "./routes/Router.Warehouse";
import RotuerArea from "./routes/Router.Area";
import RouterProductArea from "./routes/Router.ProductArea";
import RouterStock from "./routes/Router.Stock";

// Define Conection to the Data Base
async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
	} catch (error) {
		console.log("Error while Trying to Connect to the Database");
	}
}

// Establishing Conection
connectDB();

// Setting Up the Server
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());

// Define API Routes
server.use("/API/Product", RouterProduct)
server.use("/API/Type", RouterGroup)
server.use("/API/Material", RouterMaterial)
server.use("/API/Warehouse", RouterWarehouse)
server.use("/API/Area", RotuerArea)
server.use("/API/ProductArea", RouterProductArea)
server.use("/API/Stock", RouterStock)
export default server;