
import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)


userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 10);

});

// compare password 

userSchema.methods.isCorrectPassword = async function (password) {

    return bcryptjs.compareSync(password, this.password);
}

userSchema.methods.generateRefreshToken = async function (next) {

    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '5d',
        }

    );

}


export const User = mongoose.model("User", userSchema);