import { handleError } from "../middleware/errorHandler.js";
import { checkIfStylingConfigExists } from "../database/repo/util.js";
import { createStylingConfig } from "../database/repo/createDataSchema.js";
import { addStylingConfigService, deleteStylingConfigService, getAllStylingConfigByFilterService, getAllStylingConfigService, updateStylingConfigService } from "../services/services.js";
import { FormValidation } from "../database/models/formValidationsModel.js";

export const handleGetAllStylingConfigs = handleError(async (req, res) => {
    const dataRes = await getAllStylingConfigService();
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});

export const handleGetStylingConfigById = handleError(async (req, res) => {
    const { id } = req.params;
    const dataRes = await getAllStylingConfigByFilterService({ id });
    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});

export const handleGetStylingConfigByQuery = handleError(async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            status: 400,
            message: 'URL is required in the query parameters',
        });
    }

    const dataRes = await getAllStylingConfigByFilterService({ url });

    res.status(200).json({
        status: 200,
        message: 'Success',
        data: dataRes
    });
});

export const handleAddStylingConfig = handleError(async (req, res) => {
    const stylingConfigObj = createStylingConfig(req.body);

    if (stylingConfigObj.status === 'error') {
        const errMessages = stylingConfigObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }

    const { url } = req.body;
    const stylingConfigExists = await checkIfStylingConfigExists({ url });

    if (!stylingConfigExists) {
        const dataRes = await addStylingConfigService(stylingConfigObj.data);
        res.status(200).json({
            status: 200,
            message: 'Styling configuration added successfully',
            data: dataRes,
        });
    } else {
        throw {
            status: 400,
            message: 'Styling configuration already exists for this URL',
            data: ['Styling configuration already exists for this URL'],
        };
    }
});


export const handleEditStylingConfig = handleError(async (req, res) => {
    const { id } = req.params;
    const stylingConfigObj = createStylingConfig(req.body);

    if (stylingConfigObj.status == 'error') {
        const errMessages = stylingConfigObj.data.map(err => err.message);
        throw { status: 403, message: 'Validation failed', data: errMessages };
    }


    const existingStylingConfig = await checkIfStylingConfigExists({ id });

    if (!existingStylingConfig) {
        throw { status: 404, message: 'Styling configuration not found' };
    }

    const { url: newUrl } = req.body;
    const { url: oldUrl } = existingStylingConfig;

    if (newUrl !== oldUrl) {
        await FormValidation.updateMany(
            { url: oldUrl },
            { $set: { url: newUrl } }
        );
    }

    const updatedStylingConfig = await updateStylingConfigService(id, stylingConfigObj.data);

    res.status(200).json({
        status: 200,
        message: 'Styling configuration updated successfully',
        data: updatedStylingConfig,
    });
});

export const handleDeleteStylingConfig = handleError(async (req, res) => {
    const { id } = req.params;

    const deleteResult = await deleteStylingConfigService(id);

    if (!deleteResult) {
        throw {
            status: 404,
            message: 'Styling configuration not found',
            data: ['No styling configuration found with the given ID'],
        };
    }

    await FormValidation.deleteMany({ url: deleteResult.url });

    res.status(200).json({
        status: 200,
        message: 'Styling configuration deleted successfully',
        data: deleteResult
    });
});
