import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const inspect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        const indexes = await mongoose.connection.collection('users').indexes();
        console.log("Active Indexes on 'users':", JSON.stringify(indexes, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};
inspect();
