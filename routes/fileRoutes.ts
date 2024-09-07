import { Router } from 'express';
import { uploadFile, getFiles } from '../controllers/fileController';
import { upload } from '../middleware/fileUpload';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);

export default router;
