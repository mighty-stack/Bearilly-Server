import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js"
import "./modules/assessments/assessment.job.js";

const gracefulShutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

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
