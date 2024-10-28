import API_SKU from "../lib/AxiosSKU";
import { isAxiosError } from "axios";
import { CreateType } from "../types";

export async function CreateSKU(formdata: CreateType) {
	try {
		const url = "/create-sku";
		const { data } = await API_SKU.post(url, formdata);
		console.log("Response from API SKU:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}