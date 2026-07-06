import authService from './auth.service.js';
import { generateToken } from '../../utils/jwt.js';

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        const token = generateToken({ id: user._id, email: user.email });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
            token
        });
    } 
    catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        console.log("Login request:", req.body);
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        console.log("user found", user)
        const token = generateToken({ id: user._id, email: user.email });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
            token
        });
    } 
    catch (error) {
        console.error("Login error:", error);
        next(error)
    }
}

const authController = {
    register,
    login
} 

export default authController