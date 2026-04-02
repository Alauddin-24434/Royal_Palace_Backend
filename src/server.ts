import mongoose from "mongoose";
import app from "./app";
import { envVariable } from "./app/config";
import { logger } from "./app/utils/logger";
import { seedHotel } from "./seed";

async function server() {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(envVariable.MONGO_URI as string);
    logger.info("🛢 Database connected");

  
    // Seed initial users and rooms
    await seedHotel();
    // 4️⃣ Start Express app
    app.listen(envVariable.PORT, () => {
      logger.info(`🚀 Hotel booking app listening on port ${envVariable.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to connect to database ", error);
    process.exit(1);
  }
}

server();
