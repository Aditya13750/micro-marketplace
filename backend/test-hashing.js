import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    try {
        console.log("🧪 Testing bcryptjs...");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash("test123", salt);
        console.log("✅ Hashing works:", hash);

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("🧹 Dropping 'users' collection for a complete reset...");
        try {
            await mongoose.connection.collection('users').drop();
            console.log("✅ Collection dropped");
        } catch (e) {
            console.log("ℹ️ Collection not found or already dropped");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};
test();
