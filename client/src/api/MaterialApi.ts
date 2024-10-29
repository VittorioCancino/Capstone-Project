import API_Material from "../lib/AxiosMaterial";
import { isAxiosError } from "axios";
import { CreateType } from "../types";

export async function CreateMaterials(formdata: CreateType) {
	try {
		const url = "/create-material";
		const { data } = await API_Material.post(url, formdata);
		//console.log("Response from API Material:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function RemoveMaterials(formdata: CreateType) {
	try {
		const url = "/remove-material";
		const { data } = await API_Material.post(url, formdata);
		//console.log("Response from API Material:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function GetAllMaterials() {
	try {
		const url = "/get-all-materials";
		const { data } = await API_Material.get(url);
		//console.log("Response from API Material:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}