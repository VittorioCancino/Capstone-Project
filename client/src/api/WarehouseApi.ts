import API_WARE from "../lib/AxiosWarehouse";
import { isAxiosError } from "axios";
import { CreateType, CreateWarehouse } from "../types";

export async function CreateTypes(formdata: CreateWarehouse) {
	try {
		const url = "/create-warehouse";
		const { data } = await API_WARE.post(url, formdata);
		//console.log("Response from API Type:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveTypes(formdata: CreateWarehouse) {
	try {
		const url = "/remove-warehouse";
		const { data } = await API_WARE.post(url, formdata);
		//console.log("Response from API Type:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllTypes() {
	try {
		const url = "/get-all-warehouses";
		const { data } = await API_WARE.get(url);
		//console.log("Response from API Types:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}