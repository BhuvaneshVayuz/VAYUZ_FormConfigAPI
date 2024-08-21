import { StylingConfig } from "../models/stylingConfigModel.js";

export const getAllStylingConfigData = async () => {
    const dataRes = await StylingConfig.find({});
    return dataRes;
}

export const getAllStylingConfigDataByFilter = async (filters) => {
    const dataRes = await StylingConfig.find(filters);
    return dataRes;
}

export const addStylingConfigInDb = async (ipObj) => {
    const dataRes = await StylingConfig.create(ipObj);
    return dataRes;
}

export const updateStylingConfig = async (id, changesObj) => {
    const dataRes = await StylingConfig.findOneAndUpdate({ id }, changesObj, { new: true });
    return dataRes;
}

export const deleteStylingConfig = async (id) => {
    const dataRes = await StylingConfig.findOneAndDelete({ id });
    return dataRes;
}
