import { Router } from 'express';

import Auth from '../controllers/authController';

const router = Router();

router.post('/signup', Auth.signUp);

router.post('/login', Auth.login);

export default router;
