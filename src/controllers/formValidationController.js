import { handleError } from "../middleware/errorHandler.js";
import { checkIfFormValidationExists, checkIfStylingConfigExists } from "../database/repo/util.js";
import { addFormValidationService, deleteFormValidationService, getAllFormValidationByFilterService, getAllFormValidationService, updateFormValidationService } from "../services/services.js";
import { createFormValidation } from "../database/repo/createDataSchema.js";

export const handleGetAllFormValidations = handleError(async (req, res) => {
    const dataRes = await getAllFormValidationService();
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});

export const handleGetFormValidationById = handleError(async (req, res) => {
    const { id } = req.params;
    const dataRes = await getAllFormValidationByFilterService({ id });
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});


export const handleGetFormValidationByQuery = handleError(async (req, res) => {
    const { url, name } = req.query;
    const filters = {};

    if (url) {
        filters.url = url;
    }

    if (name) {
        filters.name = name;
    }

    const dataRes = await getAllFormValidationByFilterService(filters);
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});


export const handleGetFormValidationByUrlAndName = handleError(async (req, res) => {
    const { url, name } = req.params;
    const dataRes = await getAllFormValidationByFilterService({ url, name });
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});

export const handleAddFormValidation = handleError(async (req, res) => {
    const formValidationObj = createFormValidation(req.body);

    if (formValidationObj.status == 'error') {
        const errMessages = formValidationObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }

    const { url, name } = req.body;
    const id = formValidationObj.data.id

    const formValidationExists = await checkIfFormValidationExists({ url, name });

    if (!formValidationExists) {
        const stylingConfig = await checkIfStylingConfigExists({ url })

        if (stylingConfig) {
            stylingConfig.formIds.push({ name, id });
            await stylingConfig.save();

            const dataRes = await addFormValidationService(formValidationObj.data);

            res.status(200).json({
                status: 200,
                message: 'Form validation added successfully',
                data: dataRes,
            });
        } else {
            throw {
                status: 400,
                message: 'no styling config exists for this URL',
                data: ['no styling config exists for this URL'],
            };
        }
    } else {
        throw {
            status: 400,
            message: 'Form validation already exists for this URL and name',
            data: ['Form validation already exists for this URL and name'],
        };
    }
});


export const handleEditFormValidation = handleError(async (req, res) => {
    const { id } = req.params;
    const formValidationObj = createFormValidation(req.body);

    if (formValidationObj.status == 'error') {
        const errMessages = formValidationObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }

    const existingFormValidation = await checkIfFormValidationExists({ id });

    if (!existingFormValidation) {
        throw { status: 404, message: 'Form validation not found' };
    }

    const { url: newUrl, name: newName } = req.body;
    const { url: oldUrl, name: oldName } = existingFormValidation;

    if (newName !== oldName) {
        const stylingConfig = await checkIfStylingConfigExists({ url: oldUrl });

        if (stylingConfig) {
            const formIdEntry = stylingConfig.formIds.find(formId => formId.id == id);

            if (formIdEntry) {
                formIdEntry.name = newName;
                await stylingConfig.save();
            }
        }
    }

    if (newUrl !== oldUrl) {
        const newStylingConfig = await checkIfStylingConfigExists({ url: newUrl });

        if (!newStylingConfig) {
            throw {
                status: 400,
                message: 'No styling configuration found for the new URL',
            };
        }

        const oldStylingConfig = await checkIfStylingConfigExists({ url: oldUrl });

        if (oldStylingConfig) {
            oldStylingConfig.formIds = oldStylingConfig.formIds.filter(formId => formId.id !== id);
            await oldStylingConfig.save();
        }

        newStylingConfig.formIds.push({ id, name: newName });
        await newStylingConfig.save();
    }

    const updatedFormValidation = await updateFormValidationService(id, formValidationObj.data);

    res.status(200).json({
        status: 200,
        message: 'Form validation updated successfully',
        data: updatedFormValidation,
    });
});

export const handleDeleteFormValidation = handleError(async (req, res) => {
    const { id } = req.params;

    const deleteResult = await deleteFormValidationService(id);

    if (!deleteResult) {
        throw {
            status: 404,
            message: 'Form validation not found',
            data: ['No form validation found with the given ID'],
        };
    }

    const stylingConfigs = await checkIfStylingConfigExists({ url: deleteResult.url });

    stylingConfigs.formIds = stylingConfigs.formIds.filter(form => form.id != id);
    await stylingConfigs.save();

    res.status(200).json({
        status: 200,
        message: 'Form validation deleted successfully and associated styling configs updated',
        data: deleteResult
    });
});
