import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js"
import "./modules/assessments/assessment.job.js";

const startServer = async () => {
    await connectDB()

    app.get("/", (req, res) => {
        res.json({
            message: "Welcome to the API",
            status: "success"
        })
    })

    app.listen(env().PORT, () => {
        console.log(
            `Server is running on port ${env().PORT}`
        )
    })
}

startServer()
