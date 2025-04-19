import express from 'express';
import { castVote, getResults } from '../server/controllers/voteController.js';
import { protect } from '../server/middleware/authMiddleware.js';
const router = express.Router();

router.post('/cast', protect, castVote);
router.get('/results', getResults);

export default router;