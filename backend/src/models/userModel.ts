import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/drn8ou2tw/image/upload/v1756837753/754016ca-22bc-4bcf-a228-c6a69347216f.png"
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'driver'],
        default: "user"
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: "male"
    },
    rating: {
        avgRating:Number,
        totalRating: Number
    }
});

const User = mongoose.model("User", userSchema);

export default User;