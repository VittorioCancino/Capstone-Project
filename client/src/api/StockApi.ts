import API_STOCK from "../lib/AxiosStock";
import { isAxiosError } from "axios";
import { AddStock } from "../types";


export async function AddStocks(formdata: AddStock) {
	try {
		const url = "/add-stock";
		const { data } = await API_STOCK.post(url, formdata);
		//console.log("Response from API ProductArea:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveStocks(formdata: AddStock) {
	try {
		const url = "/remove-stock";
		const { data } = await API_STOCK.post(url, formdata);
		//console.log("Response from API ProductArea:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllStocks() {
	try {
		const url = "/get-all-stocks";
		const { data } = await API_STOCK.get(url);
		//console.log("Response from API ProductAreas:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}