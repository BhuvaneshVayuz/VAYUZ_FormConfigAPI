import { createFormConfig } from "../database/repo/createDataSchema.js";
import { addFormConfigService, deleteFormConfigService, getAllFormByFilterService, getAllFormService, updateFormConfigService } from "../services/formServices.js";
import { handleError } from "../middleware/errorHandler.js";
import { checkIfFormConfigExists } from "../database/repo/util.js";

export const handleGetAllFormConfigs = handleError(async (req, res) => {

    const dataRes = await getAllFormService()
    res.status(200).json({
        status: 200,
        message: 'success',
        data: dataRes
    })
})


export const handleGetFormConfigsByUrl = handleError(async (req, res) => {
    const { url } = req.params
    const dataRes = await getAllFormByFilterService({ url })
    res.status(200).json({
        status: 200,
        message: 'success',
        data: dataRes
    })
})


export const handleGetFormConfigByUrlAndName = handleError(async (req, res) => {
    const { url, name } = req.params

    const dataRes = await getAllFormByFilterService({ url, name })
    res.status(200).json({
        status: 200,
        message: 'success',
        data: dataRes
    })
})
export const handleGetFormConfigById = handleError(async (req, res) => {
    const { id } = req.params

    const dataRes = await getAllFormByFilterService({ id })
    res.status(200).json({
        status: 200,
        message: 'success',
        data: dataRes
    })
})


export const handleAddFormConfig = handleError(async (req, res) => {
    const formConfigObj = createFormConfig(req.body);

    if (formConfigObj.status == 'error') {
        const errMessages = formConfigObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }

    const { url, name } = req.body;
    const formConfigExists = await checkIfFormConfigExists(url, name);

    if (!formConfigExists) {
        const dataRes = await addFormConfigService(formConfigObj.data);

        res.status(200).json({
            status: 200,
            message: 'Form configuration added successfully',
            data: dataRes,
        });
    } else {
        throw {
            status: 400,
            message: 'Form configuration already exists for this URL and name',
            data: ['Form configuration already exists for this URL and name'],
        };
    }
});


export const handleEditFormConfig = handleError(async (req, res) => {
    const { id } = req.params;
    const formConfigObj = createFormConfig(req.body);

    if (formConfigObj.status === 'error') {
        const errMessages = formConfigObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }

    const { url, name } = req.body;

    const existingFormConfig = await checkIfFormConfigExists(url, name);

    if (existingFormConfig && existingFormConfig.id !== id) {
        throw {
            status: 400,
            message: 'Form configuration already exists for this URL and name',
            data: ['Form configuration already exists for this URL and name'],
        };
    }

    const updatedFormConfig = await updateFormConfigService(id, formConfigObj.data);

    res.status(200).json({
        status: 200,
        message: 'Form configuration updated successfully',
        data: updatedFormConfig,
    });
});


export const handleDeleteFormConfig = handleError(async (req, res) => {
    const { id } = req.params;

    const deleteResult = await deleteFormConfigService(id);

    if (!deleteResult) {
        throw {
            status: 404,
            message: 'Form configuration not found',
            data: ['No form configuration found with the given ID'],
        };
    }

    res.status(200).json({
        status: 200,
        message: 'Form configuration deleted successfully',
    });
});