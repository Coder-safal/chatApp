
import { User } from "../models/users.models.js";
import { asyncHandler } from "../utills/AsyncHandlers.js";
import { ApiError } from "../utills/ApiErrors.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import jwt from "jsonwebtoken";
const options = {
    httpOnly: true,
    secure: true,
}

const verifyJWT = asyncHandler(async (req, res, next) => {

    // console.log("token is: ", req.cookies?.token);

    const token = req.cookies.token || req.header("Authroization")?.replace("Beareer ", "");
    if (!token) {
        throw new ApiError(401, "Access token isn't valid");
    }

    const decodedToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid Access token");
    }

    req.user = user;

    next();

});


const generaterefreshToken = async (userId) => {

    const findUser = await User.findById(userId);

    if (!findUser) {
        throw new ApiError(401, "Unauthorized users!");
    }

    return await findUser.generateRefreshToken();
}

const signUp = asyncHandler(async (req, res, next) => {
    console.log("Hello sir");
    const { userName, email, password } = req.body;
    console.log("signup: ", email);

    if (['userName', 'email', 'password'].some((field) => field.trim() == "")) {
        throw new ApiError(401, "userName,email and password is required fields!");
    }

    const existUser = await User.findOne(
        {
            $or: [{ email }, { userName }]
        }
    );

    if (existUser) {
        throw new ApiError(401, "Users already exists!");
    }

    const newUser = await User.create({
        userName,
        email,
        password,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "users Regsiter succesfully!",
            newUser,
        )
    );

})

const logIn = asyncHandler(async (req, res, next) => {

    const { userName, password } = req.body;

    if (!userName || !password) {
        throw new ApiError(401, "userName and password is required fields");
    }

    const existUser = await User.findOne(
        {
            userName,
        }
    );
    // console.log("users Exists!");
    if (!existUser) {
        throw new ApiError(401, "userName or Password invalid");
    }

    const correctPassword = await existUser.isCorrectPassword(password);

    if (!correctPassword) {
        throw new ApiError(401, "Invalid password");
    }

    const refreshToken = await generaterefreshToken(existUser?._id);

    if (!refreshToken) {
        throw new ApiError(500, "Errors while generating refreshToken!");
    }

    existUser.refreshToken = refreshToken;

    return res.status(200)
        .cookie("token", refreshToken, options)
        .json(
            new ApiResponse(200, "users login succesfully!", existUser)
        );

})

const logOut = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new ApiError(401, "You aren't authorized users for logout");
    }

    res.status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, "users logout Succesfully", req.user));
})

const getAlluser = asyncHandler(async (req, res, next) => {

    const logendUser = req.user?._id;
    const allUsers = await User.find({ _id: { $ne: logendUser } }).select("-password");
    res.status(200).json(
        new ApiResponse(200, "All users fetch succesfully!", allUsers)
    );
})

export {
    signUp,
    generaterefreshToken,
    logIn,
    logOut,
    verifyJWT,
    getAlluser
}