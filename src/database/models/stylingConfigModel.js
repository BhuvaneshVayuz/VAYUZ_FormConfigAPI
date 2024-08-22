import mongoose from "mongoose";

const bundleSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    component: {
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
}, { _id: false });

const formIdSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}, { _id: false });

const stylingConfigSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    bundles: {
        type: [bundleSchema],
        required: true
    },
    formIds: {
        type: [formIdSchema],
        required: false
    }
}, { timestamps: true });

export const StylingConfig = mongoose.model('StylingConfig', stylingConfigSchema);
