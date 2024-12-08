import * as z from "zod";

export const SignUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Lastname is required."),
  email: z.string().email().min(1, "Email Address is required."),
  password: z.string().min(1, "Password is required."),
  confirmPassword: z.string().min(1, "Password is required.").optional(),
  userRole: z.string().min(1, "User Role is required."),
});
