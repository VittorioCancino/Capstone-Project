import axios from "axios";

const API_TYPE = axios.create({
	baseURL: "http://localhost:4000/API/Type",
});

export default API_TYPE;