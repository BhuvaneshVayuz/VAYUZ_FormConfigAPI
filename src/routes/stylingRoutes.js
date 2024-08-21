import express from 'express';
import {
    handleGetAllStylingConfigs,
    handleGetStylingConfigById,
    handleGetStylingConfigByQuery,
    handleAddStylingConfig,
    handleEditStylingConfig,
    handleDeleteStylingConfig
} from '../controllers/stylingConfigController.js';

const router = express.Router();

// GET all styling configs
router.get('/', handleGetAllStylingConfigs);

// GET a specific styling config by ID
router.get('/id/:id', handleGetStylingConfigById);

// GET styling configs by URL and optional path
router.get('/search', handleGetStylingConfigByQuery);

// POST a new styling config
router.post('/', handleAddStylingConfig);

// PUT to edit a styling config by ID
router.put('/:id', handleEditStylingConfig);

// DELETE a styling config by ID
router.delete('/:id', handleDeleteStylingConfig);

export default router;
