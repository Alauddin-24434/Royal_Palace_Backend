import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "./app/mongoSchema/user.schema";

const saltRounds = 12;

// ==============================
// Seed Users
// ==============================
export const seedUsers = async () => {
  try {
    // ---------- Admin ----------
    const adminExists = await UserModel.findOne({ email: "admin@royalpalace.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", saltRounds);
      await UserModel.create({
        name: "Admin User",
        email: "admin@royalpalace.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    }

    // ---------- Receptionist ----------
    const receptionistExists = await UserModel.findOne({ email: "reception@royalpalace.com" });
    if (!receptionistExists) {
      const hashedPassword = await bcrypt.hash("Reception@123", saltRounds);
      await UserModel.create({
        name: "Receptionist User",
        email: "reception@royalpalace.com",
        password: hashedPassword,
        role: "receptionist",
      });
      console.log("✅ Receptionist user created");
    }

    // ---------- Guest ----------
    const guestExists = await UserModel.findOne({ email: "guest@royalpalace.com" });
    if (!guestExists) {
      const hashedPassword = await bcrypt.hash("Guest@123", saltRounds);
      await UserModel.create({
        name: "Sample Guest",
        email: "guest@royalpalace.com",
        password: hashedPassword,
        role: "guest",
      });
      console.log("✅ Guest user created");
    }
  } catch (err) {
    console.error("❌ Seeding users failed:", err);
  }
};


// ==============================
// Full Seed
// ==============================
export const seedHotel = async () => {
  await seedUsers();

};