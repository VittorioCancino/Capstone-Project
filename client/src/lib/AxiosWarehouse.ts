import axios from "axios";

const API_WARE = axios.create({
	baseURL: "http://localhost:4000/API/Warehouse",
});

export default API_WARE;