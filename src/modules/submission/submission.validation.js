import { z } from "zod";

export const submissionSchema = z.object({
  submissionType: z.enum(["File", "Google Drive", "Canva", "YouTube"]),
  fileUrl: z.string().trim().url().optional().or(z.literal("")).nullable(),
  remarks: z.string().max(1000).optional().nullable(),
  _fileProvided: z.boolean().optional(),
}).superRefine((data, ctx) => {
  const hasFile = Boolean(data._fileProvided);
  const hasUrl = Boolean(data.fileUrl && data.fileUrl.trim());

  if (data.submissionType === "File") {
    if (!hasFile && !hasUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload a file or provide a file URL.",
        path: ["fileUrl"],
      });
    }
    return;
  }

  if (!hasUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please provide a valid link for this submission type.",
      path: ["fileUrl"],
    });
  }
});