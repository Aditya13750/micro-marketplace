import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        const collection = mongoose.connection.collection('users');
        const indexes = await collection.indexes();
        console.log("Current indexes:", JSON.stringify(indexes, null, 2));

        for (const index of indexes) {
            if (index.name !== '_id_' && index.name !== 'email_1') {
                console.log(`Dropping index: ${index.name}`);
                await collection.dropIndex(index.name);
                console.log(`✅ Dropped ${index.name}`);
            }
        }
        console.log("Final index state verification...");
        const finalIndexes = await collection.indexes();
        console.log("Final indexes:", JSON.stringify(finalIndexes, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("❌ Error during index cleanup:", err);
        process.exit(1);
    }
};
fix();
