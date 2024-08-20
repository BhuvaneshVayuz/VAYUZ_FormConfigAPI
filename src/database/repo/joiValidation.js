import Joi from "joi"

export function validateFormConfig(data) {
    const joiSchema = Joi.object({
        url: Joi.string()
            .uri()
            .required()
            .messages({
                'string.uri': 'URL must be a valid URI.',
                'string.empty': 'URL is required.'
            }),

        name: Joi.string()
            .min(3)
            .max(28)
            .required()
            .messages({
                'string.min': 'Name must be at least 3 characters long.',
                'string.max': 'Name must be at most 28 characters long.',
                'string.empty': 'Name is required.'
            }),

        headingText: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.min': 'Heading text must be at least 3 characters long.',
                'string.max': 'Heading text must be at most 100 characters long.',
                'string.empty': 'Heading text is required.'
            }),

        logoLink: Joi.string()
            .uri()
            .optional()
            .messages({
                'string.uri': 'Logo link must be a valid URL.',
                'string.empty': 'Logo link is required.'
            }),

        configurations: Joi.array().items(
            Joi.object({
                fieldName: Joi.string()
                    .min(3)
                    .max(50)
                    .required()
                    .messages({
                        'string.min': 'Field name must be at least 3 characters long.',
                        'string.max': 'Field name must be at most 50 characters long.',
                        'string.empty': 'Field name is required.'
                    }),

                type: Joi.string()
                    .valid('text', 'email', 'password', 'number', 'date', 'checkbox', 'radio', 'textarea')
                    .required()
                    .messages({
                        'any.only': 'Type must be one of string, number, email, password, date, checkbox, radio, textarea.',
                        'string.empty': 'Type is required.'
                    }),

                regex: Joi.string()
                    .optional()
                    .pattern(new RegExp())
                    .messages({
                        'string.pattern.base': 'Regex must be a valid regular expression.'
                    }),
            })
        ).required()
            .messages({
                'array.base': 'Configurations must be an array of objects.',
                'array.empty': 'Configurations are required.'
            }),
    }).options({ abortEarly: false });

    return joiSchema.validate(data);
}
