import { z } from "zod";

const validateRequest = (schema, options = {}) => {
  return async (req, res, next) => {
    try {
      const payload = {
        ...req.body,
        ...req.params,
        ...req.query,
        _fileProvided: Boolean(req.file),
      };

      const parsed = await schema.parseAsync(payload);
      const { _fileProvided, ...sanitizedBody } = parsed;

      req.body = sanitizedBody;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Validation error",
      });
    }
  };
};

export default validateRequest;