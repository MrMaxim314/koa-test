import { Context } from 'koa';
import { pool } from './pool';
import HashService from '../helpers/HashService';

export class UserService {
    getAll() {}

    async updateById(ctx: Context) {
        const { password, email }: any = ctx.request.body;

        const userByEmail = (
            await pool.query('SELECT * FROM users WHERE username = $1', [
                email ?? 'mn',
            ])
        ).rows[0];

        if (userByEmail) {
            ctx.status = 401;
            ctx.body = { message: 'User with given email already exists.' };
            return;
        }

        const user = (
            await pool.query('SELECT * FROM users WHERE user_id = $1', [
                ctx.params.id,
            ])
        ).rows[0];

        await pool.query(
            'UPDATE users SET username = $1, password = $2 WHERE user_id = $3',
            [
                email ?? user.username,
                password
                    ? await HashService.hashPassword(password)
                    : user.password,
                ctx.params.id,
            ],
        );
    }

    async delete(ctx: Context) {
        await pool.query('DELETE FROM users WHERE user_id = $1', [
            ctx.params.id,
        ]);

        ctx.status = 204;
    }
}
