import { addFormInDb, deleteFormConfig, getAllFormData, getAllFormDataByFilter, updateFormConfig } from "../database/repo/dataQueries.js"

export const getAllFormService = async () => {
    const dataRes = await getAllFormData()
    return dataRes
}


export const getAllFormByFilterService = async (filters) => {
    const dataRes = await getAllFormDataByFilter(filters)
    return dataRes
}


export const addFormConfigService = async (data) => {
    const dataRes = await addFormInDb(data)
    return dataRes
}


export const updateFormConfigService = async (id, data) => {
    const dataRes = await updateFormConfig(id, data)
    return dataRes
}


export const deleteFormConfigService = async (id) => {
    const dataRes = await deleteFormConfig(id)
    return dataRes
}