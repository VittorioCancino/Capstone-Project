import axios from "axios";

const API_STOCK = axios.create({
	baseURL: "http://localhost:4000/API/Stock",
});

export default API_STOCK;