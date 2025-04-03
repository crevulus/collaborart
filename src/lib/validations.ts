import { z } from "zod";

export const usernameSchema = z.string().min(2, {
  message: "Name must be at least 2 characters.",
});

export const pinSchema = z
  .string()
  .min(4, {
    message: "PIN must be > 4 digits.",
  })
  .max(6, {
    message: "PIN must be < 6 digits.",
  })
  .regex(/^\d+$/, {
    message: "PIN must contain only numbers.",
  });
