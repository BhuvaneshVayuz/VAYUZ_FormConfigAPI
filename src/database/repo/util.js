import { FormConfig } from "../models/formConfigModel.js";
import { FormValidation } from "../models/formValidationsModel.js";
import { StylingConfig } from "../models/stylingConfigModel.js";

export async function checkIfFormConfigExists(url, name) {
    const response = await FormConfig.findOne({ url: url, name: name });
    return response;
}

export async function checkIfStylingConfigExists(url) {
    const response = await StylingConfig.findOne({ url });
    return response;
}

export async function checkIfFormValidationExists(url, name) {
    const response = await FormValidation.findOne({ url, name });
    return response;
}