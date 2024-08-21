import {
    addStylingConfigInDb,
    deleteStylingConfig,
    getAllStylingConfigData,
    getAllStylingConfigDataByFilter,
    updateStylingConfig
} from "../database/repo/stylingConfigQueries.js";

import {
    addFormValidationInDb,
    deleteFormValidation,
    getAllFormValidationData,
    getAllFormValidationDataByFilter,
    updateFormValidation
} from "../database/repo/formValidationQueries.js";

// StylingConfig Services

export const getAllStylingConfigService = async () => {
    const dataRes = await getAllStylingConfigData();
    return dataRes;
}

export const getAllStylingConfigByFilterService = async (filters) => {
    const dataRes = await getAllStylingConfigDataByFilter(filters);
    return dataRes;
}

export const addStylingConfigService = async (data) => {
    const dataRes = await addStylingConfigInDb(data);
    return dataRes;
}

export const updateStylingConfigService = async (id, data) => {
    const dataRes = await updateStylingConfig(id, data);
    return dataRes;
}

export const deleteStylingConfigService = async (id) => {
    const dataRes = await deleteStylingConfig(id);
    return dataRes;
}


// FormValidation Services

export const getAllFormValidationService = async () => {
    const dataRes = await getAllFormValidationData();
    return dataRes;
}

export const getAllFormValidationByFilterService = async (filters) => {
    const dataRes = await getAllFormValidationDataByFilter(filters);
    return dataRes;
}

export const addFormValidationService = async (data) => {
    const dataRes = await addFormValidationInDb(data);
    return dataRes;
}

export const updateFormValidationService = async (id, data) => {
    const dataRes = await updateFormValidation(id, data);
    return dataRes;
}

export const deleteFormValidationService = async (id) => {
    const dataRes = await deleteFormValidation(id);
    return dataRes;
}
