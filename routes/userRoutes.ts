import { Context, Next } from 'koa';
import Router from 'koa-router';
import { UserService } from '../services/UserService';

export const userRouter = new Router({ prefix: '/api' });

const userService = new UserService();

userRouter.get('/', userService.getAll);
userRouter.patch('/:id', userService.updateById);
userRouter.delete('/:id', userService.delete);
