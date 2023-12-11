import { v4 } from 'uuid';
import { redis } from '../redis';

export const confirmEmailLink = async (userId: string, hostUI: string) => {
    const id = v4();

    await redis.set(id, JSON.stringify({ userId, hostUI }), 'EX', 60 * 60 * 15);

    return `${process.env.BACKEND_HOST}/user/confirm/${id}`;
};
