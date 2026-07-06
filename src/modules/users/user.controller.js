

const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}

const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateProfile(req.user._id, req.body);
        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

const userController = {
    getProfile,
    updateProfile
} 

export default userController