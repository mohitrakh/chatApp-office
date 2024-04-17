import express from 'express'
import { loginUser, logOut, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUp);
router.post('/logout', logOut);

export default router