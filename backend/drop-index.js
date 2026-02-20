import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        try {
            await mongoose.connection.collection('users').dropIndex('username_1');
            console.log("✅ Successfully dropped index 'username_1'");
        } catch (e) {
            console.log("ℹ️ Index 'username_1' not found, it might already be dropped.");
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};
fix();
