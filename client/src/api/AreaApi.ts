import API_AREA from "../lib/AxiosAreas";
import { isAxiosError } from "axios";
import { CreateArea, DeleteArea } from "../types";

export async function CreateAreas(formdata: CreateArea) {
	try {
		const url = "/create-area";
		const { data } = await API_AREA.post(url, formdata);
		//console.log("Response from API Type:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveAreas(formdata: DeleteArea) {
	try {
		const url = "/remove-area";
		const { data } = await API_AREA.post(url, formdata);
		//console.log("Response from API Type:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllAreas() {
	try {
		const url = "/get-all-areas";
		const { data } = await API_AREA.get(url);
		//console.log("Response from API Types:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}