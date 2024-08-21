import { FormValidation } from "../models/formValidationsModel.js";

export const getAllFormValidationData = async () => {
    const dataRes = await FormValidation.find({});
    return dataRes;
}

export const getAllFormValidationDataByFilter = async (filters) => {
    const dataRes = await FormValidation.find(filters);
    return dataRes;
}

export const addFormValidationInDb = async (ipObj) => {
    const dataRes = await FormValidation.create(ipObj);
    return dataRes;
}

export const updateFormValidation = async (id, changesObj) => {
    const dataRes = await FormValidation.findOneAndUpdate({ id }, changesObj, { new: true });
    return dataRes;
}

export const deleteFormValidation = async (id) => {
    const dataRes = await FormValidation.findOneAndDelete({ id });
    return dataRes;
}
