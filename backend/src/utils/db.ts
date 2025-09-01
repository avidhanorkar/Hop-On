import mongoose from 'mongoose';

const connectDB = async () => {
    let mongodb = process.env.MongoDB_URI;
    await mongoose.connect(mongodb as string);
    console.log("✅ Mongo DB connected successfully");
}

export default connectDB;