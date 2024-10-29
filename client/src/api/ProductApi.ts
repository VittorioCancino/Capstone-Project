import API_SKU from "../lib/AxiosSKU";
import { isAxiosError } from "axios";
import { CreateProduct, AddProduct } from "../types";

export async function CreateProducts(formdata: CreateProduct) {
	try {
		const url = "/create-product";
		const { data } = await API_SKU.post(url, formdata);
		//console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function AddStock(formdata: AddProduct) {
	try {
		const url = "/add-stock-product";
		const { data } = await API_SKU.post(url, formdata);
		//console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveStock(formdata: AddProduct) {
	try {
		const url = "/remove-stock-product";
		const { data } = await API_SKU.post(url, formdata);
		//console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveProducts(formdata: CreateProduct) {
	try {
		const url = "/remove-product";
		const { data } = await API_SKU.post(url, formdata);
		//console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllProducts() {
	try {
		const url = "/get-products-information";
		const { data } = await API_SKU.get(url);
		//console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}