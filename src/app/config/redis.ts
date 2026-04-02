// import { createClient , RedisClientType } from "redis";
import dotenv from "dotenv";
dotenv.config();

// const isDocker: boolean = process.env.DOCKER_CONTAINER === "true";
// const url = process.env.REDIS_URL || (isDocker ? "redis://royalplace_redis:6379" : "redis://localhost:6379");

// export const redisClient :RedisClientType = createClient({ url });

// redisClient.on("error", (err) => console.error("Redis Client Error:", err));

// export const connectRD = async () => {
//   try {
//     await redisClient.connect();
//     console.log(`✅ Connected to Redis (${isDocker ? "Docker" : "Local"})`);
//   } catch (err) {
//     console.error("❌ Redis connection failed:", err);
//   }
// };

import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest:null
});
