import Router from 'koa-router';
import { AuthService } from '../services/AuthService';
import JwtService from '../services/JwtService';

export const authRouter = new Router();

const authService = new AuthService();

authRouter.post('/signup', authService.signup);
authRouter.post('/login', authService.login);
authRouter.get('/secret', JwtService.verifyToken);
