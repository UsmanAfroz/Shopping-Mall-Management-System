import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
    throw new Error("MONGODB_CONNECTION_STRING is not set in environment variables");
}

    console.log("Connecting to MongoDB using connection string:", connectionString); // For debugging
    try {
        await mongoose.connect(connectionString)
            .then(() => {
                console.log("Successfully connected to database");
            })
            .catch((error) => {
                console.log("Database connection failed. Exiting now...");
                console.error(error);
                process.exit(1);
            });
    } catch (err) {
        console.log(`Database error: ${err}`);
    }
};
