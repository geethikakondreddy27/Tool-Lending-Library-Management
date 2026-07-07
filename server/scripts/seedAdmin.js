require("dotenv").config();

const connectDB = require("../src/database/mongodb");
const User = require("../src/models/User");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("ℹ️ Default administrator already exists.");
      process.exit(0);
    }

    await User.create({
      fullName: "System Administrator",
      email: "admin@toollibrary.com",
      password: "Admin@123",
      role: "admin",
      isActive: true,
    });

    console.log("\n=================================");
    console.log("✅ Default administrator created.");
    console.log("=================================");
    console.log("Email    : admin@toollibrary.com");
    console.log("Password : Admin@123");
    console.log("=================================\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed administrator.");
    console.error(error);

    process.exit(1);
  }
};

seedAdmin();