import axios from "axios";

const API_PRODUCT_AREA = axios.create({
	baseURL: "http://localhost:4000/API/ProductArea",
});

export default API_PRODUCT_AREA;