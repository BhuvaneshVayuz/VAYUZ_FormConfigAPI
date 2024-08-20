import express from 'express';
import {
    handleGetAllFormConfigs,
    handleGetFormConfigsByUrl,
    handleGetFormConfigByUrlAndName,
    handleAddFormConfig,
    handleDeleteFormConfig,
    handleEditFormConfig,
    handleGetFormConfigById
} from '../controllers/formConfigController.js';

const router = express.Router();


router.get('/', handleGetAllFormConfigs);
router.get('/:url', handleGetFormConfigsByUrl);

router.get('/:url/:name', handleGetFormConfigByUrlAndName);

router.get('/id/:id', handleGetFormConfigById);

router.post('/', handleAddFormConfig);

router.put('/:id', handleEditFormConfig);

router.delete('/:id', handleDeleteFormConfig);

export default router;
