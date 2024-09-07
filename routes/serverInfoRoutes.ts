import { Router } from 'express';
import { getServerStatus } from '../controllers/serverInfoController';

const router = Router();

// Route for server status
router.get('/status', getServerStatus);

export default router;
