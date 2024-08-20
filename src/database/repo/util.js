import { FormConfig } from "../models/formConfigModel.js";

export async function checkIfFormConfigExists(url, name) {
    const response = await FormConfig.findOne({ url: url, name: name });
    return response;
}
