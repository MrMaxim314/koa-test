import Router from 'koa-router';
import { AuthService } from '../services/AuthService';

export const authRouter = new Router();

const authService = new AuthService();

authRouter.post('/ha', authService.signup);
authRouter.post('/login', authService.login);
