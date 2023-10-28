import Redis from 'ioredis';
export const redis = new Redis({
    host: 'redis-15958.c124.us-central1-1.gce.cloud.redislabs.com',
    port: 15958,
    password: 'tuanbmt123'
    // host: '127.0.0.1',
    // port: 6379,
});

export const getUserIdFromRedis = (id: string) => {
    return new Promise((resolve, reject) => {
        redis.get(id, (err, userId) => {
            if (err) {
                reject(err);
            } else {
                resolve(userId);
            }
        });
    });
};
