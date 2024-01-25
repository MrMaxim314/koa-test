import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Context, Next } from 'koa';

dotenv.config();

export class JwtService {
    createToken(payload: string) {
        return jwt.sign(
            { payload: payload },
            process.env.JWT_SECRET as string,
            {
                expiresIn: 60 * 60,
            },
        );
    }

    async verifyToken(ctx: Context, next: Next) {
        const token = ctx.headers.authorization?.split(' ')[1];

        if (!token) {
            ctx.status = 403;
            ctx.body = { message: 'Forbidden' };
            return;
        }

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET as string);
            ctx.state.user = data;
            ctx.status = 200;
            await next();
        } catch (e) {
            ctx.status = 500;
            ctx.body = { message: e };
        }
    }
}

export default new JwtService();
