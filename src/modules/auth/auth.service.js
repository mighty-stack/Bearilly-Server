import bcrypt from "bcryptjs";
import User from "../users/user.model.js";

const registerUser = async (userData) => {
    const { 
        fullName, 
        email, 
        password } = 
        userData;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        fullName,
        email,
        password: hashedPassword
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already Exist");
    }
    return await user.save()
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials")
    }

    return user;
}

const authService = {
    registerUser,
    loginUser
}

export default authService