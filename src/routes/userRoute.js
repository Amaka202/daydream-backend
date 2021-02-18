import { Router } from 'express';

import User from '../controllers/userController';
import checkTokenFunction from '../middleware/checkTokenFunction';

const router = Router();

router.get('/user', checkTokenFunction, User.getUser);

export default router;