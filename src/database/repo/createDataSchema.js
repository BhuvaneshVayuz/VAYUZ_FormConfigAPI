import { v4 as uuid } from "uuid"
import { validateFormConfig, validateFormValidations, validateStylingConfig } from "./joiValidation.js"


export function createFormConfig(rawData) {
    const validatedObj = validateFormConfig(rawData);

    if (validatedObj.error) {
        return { status: 'error', data: validatedObj.error.details };
    } else {
        validatedObj.value.id = uuid();
        validatedObj.value.fieldsLength = validatedObj.value.configurations.length
        return { status: 'success', data: validatedObj.value };
    }
}


export function createStylingConfig(rawData) {
    const validatedObj = validateStylingConfig(rawData);

    if (validatedObj.error) {
        return { status: 'error', data: validatedObj.error.details };
    } else {
        validatedObj.value.id = uuid();
        return { status: 'success', data: validatedObj.value };
    }
}


export function createFormValidation(rawData) {
    const validatedObj = validateFormValidations(rawData);

    if (validatedObj.error) {
        return { status: 'error', data: validatedObj.error.details };
    } else {
        validatedObj.value.id = uuid();
        validatedObj.value.fieldsLength = validatedObj.value.configurations.length;
        return { status: 'success', data: validatedObj.value };
    }
}