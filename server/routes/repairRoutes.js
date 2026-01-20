import express from 'express';
import { getRepairs, addRepair, updateRepairStatus, deleteRepair } from '../controllers/repairController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getRepairs);
router.post('/', protect, addRepair); // Clients add repairs
router.put('/:id/status', protect, updateRepairStatus);
router.delete('/:id', protect, deleteRepair);

export default router;
