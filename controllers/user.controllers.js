import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js"

const registerUser = asyncHandler( async (req, res) => {

    const { username, email, fullName, password, isGuide } = req.body;

    if( username === "" )   throw new ApiError(400, "Username cannot be blank");
    if( email === "" )      throw new ApiError(400, "Email cannot be blank");
    if( fullName === "" )   throw new ApiError(400, "Full name cannot be blank");
    if( password === "" )   throw new ApiError(400, "Password cannot be blank");

    const existingUserName = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if(existingUserName && existingEmail)     throw new ApiError(409, "Username and Email already exists")
    else if (existingEmail)                   throw new ApiError(409, "Email already in use")
    else if (existingUserName)                throw new ApiError(409, "Username already in use")

    const entryDB = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        fullName,
        password,
        isGuide,
    })

    const createdUser = await User.findById(entryDB._id).select("-password")

    if(!createdUser)    throw new ApiError(500, "Something went wrong while updating the DB")

    console.log(`Created new user ${createdUser.username}`)
    return res
        .status(201)
        .json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    const { username, email, password } = req.body
    if ( !(username || email) )      throw new ApiError(400,"Username or email is required to login")

    const user = await User.findOne({
        $or: [ {username}, {email}]
    })
    if(!user)   throw new ApiError(404,"User does not exist")

    const psswdCheck = await user.isPasswordCorrect(password)
    if(!psswdCheck) throw new ApiError(404,"Wrong password")

    const usrInstance = await User.findById(user._id).select("-password")

    return res
            .status(200)
            .json(new ApiResponse(200, {usrInstance}, "User logged in successfully"))
})



export { registerUser, loginUser };