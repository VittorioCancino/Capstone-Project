import API_Material from "../lib/AxiosMaterial";
import { isAxiosError } from "axios";
import { CreateType } from "../types";

export async function CreateMaterial(formdata: CreateType) {
	try {
		const url = "/create-material";
		const { data } = await API_Material.post(url, formdata);
		console.log("Response from API Material:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}