import { Redis } from "ioredis";

const url = `redis://:${process.env.CACHE_PASSWORD}@${process.env.CACHE_HOSTNAME}:6379`;
export const redisClient = new Redis(url);
