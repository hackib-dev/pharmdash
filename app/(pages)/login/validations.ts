import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Email Address is required"),
  password: z.string().min(1, "Password is required."),
});
