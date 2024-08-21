import express from 'express';
import {
    handleGetAllFormValidations,
    handleGetFormValidationById,
    handleGetFormValidationByQuery,
    handleAddFormValidation,
    handleEditFormValidation,
    handleDeleteFormValidation
} from '../controllers/formValidationController.js';

const router = express.Router();

// GET all form validations
router.get('/', handleGetAllFormValidations);

// GET a specific form validation by ID
router.get('/id/:id', handleGetFormValidationById);

// GET form validations by query parameters (url and optional name)
router.get('/query', handleGetFormValidationByQuery);

// POST a new form validation
router.post('/', handleAddFormValidation);

// PUT to edit a form validation by ID
router.put('/:id', handleEditFormValidation);

// DELETE a form validation by ID
router.delete('/:id', handleDeleteFormValidation);

export default router;
