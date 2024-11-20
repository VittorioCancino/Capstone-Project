import API_PRODUCT_AREA from "../lib/AxiosProductArea";
import { isAxiosError } from "axios";
import { CreateProductArea, DeleteProductArea } from "../types";

export async function CreateProductAreas(formdata: CreateProductArea) {
	try {
		const url = "/create-product-area";
		const { data } = await API_PRODUCT_AREA.post(url, formdata);
		//console.log("Response from API ProductArea:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveProductAreas(formdata: DeleteProductArea) {
	try {
		const url = "/remove-product-area";
		const { data } = await API_PRODUCT_AREA.post(url, formdata);
		//console.log("Response from API ProductArea:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllProductAreas() {
	try {
		const url = "/get-all-product-areas";
		const { data } = await API_PRODUCT_AREA.get(url);
		//console.log("Response from API ProductAreas:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}