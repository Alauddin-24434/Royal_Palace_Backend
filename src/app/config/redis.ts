// import { createClient , RedisClientType } from "redis";
import dotenv from "dotenv";
dotenv.config();

import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest:null
});
