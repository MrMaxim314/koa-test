import { Context } from 'koa';
import { pool } from '../helpers/pool';
import HashService from '../helpers/HashService';
import { response } from '../helpers/response';
import { IUserData } from './AuthService';

export class UserService {
    async getAll(ctx: Context) {
        const page = ctx.query.page;
        const limit = ctx.query.limit || 5;

        const queryResult = await pool.query(
            'SELECT * FROM users ORDER BY user_id LIMIT $2 OFFSET (($1 - 1) * $2)',
            [page, limit],
        );

        response(ctx, 200, queryResult.rows);
    }

    async updateById(ctx: Context) {
        const { password, email } = ctx.request.body as IUserData;

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
