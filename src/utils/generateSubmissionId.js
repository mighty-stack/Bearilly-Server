import crypto from "crypto";

const generateSubmissionId = () => {
  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `BRLY-${random}`;
};

export default generateSubmissionId;