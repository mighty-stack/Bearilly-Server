import User from '../users/user.model.js';

const getDashboardData = 
    async (userId)=> {
        
        const user =
            await User.findById(userId).select('-password');

        if (!user) {
            throw new Error("User not found");
        }

        return {
            user,

            stats: {
                lessonsStarted: 0,
                lessonsCompleted: 0,
                assessmentsTaken: 0,
                submissionsMade: 0,
                totalTimeSpent: 0,
            }
        }
    }

    const dashboardService = {
        getDashboardData
    } 

    export default dashboardService
