import mongoose, { ConnectOptions } from "mongoose";


const options: ConnectOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const connectDB = async (mongoURI: string): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, options);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

export default connectDB