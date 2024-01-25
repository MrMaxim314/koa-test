import argon2 from 'argon2';

class HashService {
    async hashPassword(password: string) {
        return argon2.hash(password);
    }

    async verifyPassword(hash: string, password: string) {
        return await argon2.verify(hash, password);
    }
}

export default new HashService();
