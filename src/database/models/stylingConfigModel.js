import mongoose from "mongoose";

const stylingConfigSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    componentLink: {
        type: String,
        required: false
    },
    heading: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    }
}, { timestamps: true });

export const StylingConfig = mongoose.model('StylingConfig', stylingConfigSchema);
