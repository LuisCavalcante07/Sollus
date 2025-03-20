import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userid: { type: Number, required: false, unique: true }, // Alterado para Number
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastlogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;