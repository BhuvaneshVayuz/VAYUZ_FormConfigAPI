import { v4 as uuid } from "uuid"
import { validateFormConfig } from "./joiValidation.js"

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
