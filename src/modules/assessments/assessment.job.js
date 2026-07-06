import cron from "node-cron";
import Assessment from "./assessment.model.js";

cron.schedule("0 * * * *", async () => {

  await Assessment.updateMany(
    {
      status: "Published",
      publishAt: {
        type: Date,
      },
      deadline: {
        $lt: new Date(),
      },
    },
    {
      status: "Closed",
    }
  );

  console.log("Expired assessments closed.");

});
