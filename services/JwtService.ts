import * as jwt from 'jsonwebtoken';

export class JwtService {
    createToken(payload: string) {
        return jwt.sign({ payload: payload }, 'secret-key', {
            expiresIn: 60 * 60,
        });
    }

    verifyToken(token: string) {}
}

export default new JwtService();
