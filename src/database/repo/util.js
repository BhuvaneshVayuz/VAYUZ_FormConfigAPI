import { FormConfig } from "../models/formConfigModel.js";
import { FormValidation } from "../models/formValidationsModel.js";
import { StylingConfig } from "../models/stylingConfigModel.js";

export async function checkIfFormConfigExists(url, name) {
    const response = await FormConfig.findOne({ url: url, name: name });
    return response;
}

export async function checkIfStylingConfigExists(filters) {
    const response = await StylingConfig.findOne(filters);
    return response;
}

export async function checkIfFormValidationExists(filters) {
    const response = await FormValidation.findOne(filters);
    return response;
}