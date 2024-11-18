import axios from "axios";

const API_AREA = axios.create({
	baseURL: "http://localhost:4000/API/Area",
});

export default API_AREA;