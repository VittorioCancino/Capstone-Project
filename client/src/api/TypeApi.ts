import API_TYPE from "../lib/AxiosTypes";
import { isAxiosError } from "axios";
import { CreateType } from "../types";

export async function CreateTypes(formdata: CreateType) {
	try {
		const url = "/create-type";
		const { data } = await API_TYPE.post(url, formdata);
		console.log("Response from API Type:", data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}