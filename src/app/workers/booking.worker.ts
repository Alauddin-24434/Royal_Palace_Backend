import { Worker } from "bullmq";
import { redis } from "../config/redis";
import PaymentModel from "../mongoSchema/payment.schema";

export const bookingWorker = new Worker(
  "booking-worker",
    async (job) => {
        const { bookingId, transactionId} = job.data;
    console.log(`booking job name: ${job.name}, data: ${job.data}`);

      if (job.name === "booking-created") {
        await PaymentModel.create({bookingId, transactionId})
    }
      
  },
  {
    connection: redis,
  },
);
