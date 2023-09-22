import { Redis } from "ioredis";

const url = `${process.env.CACHE_URL}`;
export const redisClient = new Redis(url);
