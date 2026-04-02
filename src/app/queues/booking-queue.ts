import { Queue} from "bullmq";
import { redis } from "../config/redis";
export const bookingQueue = new Queue("booking-queue", {
    connection: redis,
})