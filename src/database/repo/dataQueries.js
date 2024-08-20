import { FormConfig } from "../models/formConfigModel.js"


export const getAllFormData = async () => {
    const dataRes = await FormConfig.find({})
    return dataRes
}

export const getAllFormDataByFilter = async (filters) => {
    const dataRes = await FormConfig.find(filters)
    return dataRes
}



export const addFormInDb = async (ipObj) => {
    const dataRes = await FormConfig.create(ipObj)
    return dataRes
}


export const updateFormConfig = async (id, changesObj) => {
    const dataRes = await FormConfig.findOneAndUpdate({ id }, changesObj, { new: true })
    return dataRes
}

export const deleteFormConfig = async (id) => {
    const dataRes = await FormConfig.findOneAndDelete({ id })
    return dataRes
}
