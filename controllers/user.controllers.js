import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js"

const generateRefreshToken = async (userId) => {
    try {
        const userInstanceOfDB = await User.findById(userId)
        const refreshToken = userInstanceOfDB.generateRefreshToken()
        //updating the DB with the refresh token
        userInstanceOfDB.refreshToken = refreshToken
        await userInstanceOfDB.save({ validationBeforeSave: false })
        return refreshToken;

    } catch (error) {
        throw new ApiError(500, "Failed to generate refresh token");
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const { username, email, fullName, password, isGuide } = req.body;

    if( !username || !email || !fullName || !password)           return res.status(400).json(new ApiResponse(400, "Fill all the details"))

    const existingUserName = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if(existingUserName && existingEmail)     return res.status(409).json(new ApiResponse(409, "Username and Email already exists"))
    else if (existingEmail)                   return res.status(409).json(new ApiResponse(409, "Email already in use"))
    else if (existingUserName)                return res.status(409).json(new ApiResponse(409, "Username taken"))

    const entryDB = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        fullName,
        password,
        isGuide,
    })

    const createdUser = await User.findById(entryDB._id).select("-password -refreshToken")

    if(!createdUser)    throw new ApiError(500, "Something went wrong while updating the DB")

    console.log(`Created new user ${createdUser.username}`)
    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    const { username, password } = req.body
    if (!username)      return res.status(400).json(new ApiResponse(400, "Please enter username"));

    const user = await User.findOne({ username })
    if(!user)   return res.status(404).json(new ApiResponse(404, "User does not exist"));

    const psswdCheck = await user.isPasswordCorrect(password)
    if(!psswdCheck) return res.status(404).json(new ApiResponse(404, "Incorrect password"));

    const refreshToken = await generateRefreshToken(user._id)

    const usrInstance = await User.findById(user._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {usrInstance}, "User logged in successfully"))
})



export { registerUser, loginUser };