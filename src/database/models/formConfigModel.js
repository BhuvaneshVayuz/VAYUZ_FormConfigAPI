import mongoose from "mongoose";

const formConfigSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    headingText: {
        type: String,
        required: true
    },
    logoLink: {
        type: String,
        required: false,
    },
    configurations: [{
        fieldName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        regex: {
            type: String,
            required: true
        }
    }],
    fieldsLength: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const FormConfig = mongoose.model('formConfig', formConfigSchema);
