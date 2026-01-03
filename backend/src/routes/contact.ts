import { Router } from 'express';
import {
  submitInquiry,
  getAllInquiries,
  updateInquiryStatus
} from '../controllers/contactController';
import { validateContactForm } from '../middleware/validation';

const router = Router();

router.post('/', validateContactForm, submitInquiry);
router.get('/', getAllInquiries);
router.patch('/:id/status', updateInquiryStatus);

export { router as contactRouter };
