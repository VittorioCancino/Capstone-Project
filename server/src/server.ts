import express from "express";
import db from "./config/db";
import RouterInventory from "./routes/router.inventory";
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
server.use("/API/Inventory", RouterInventory)
export default server;