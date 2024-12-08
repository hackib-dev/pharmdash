import * as z from "zod";

const ForgotPasswordFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .length(11, "Phone number must be 11 digits"),
});

const OtpFormSchema = z.object({
  otp: z.string().min(1, "Otp is required."),
});

const ResetPasswordFormSchema = z.object({
  newPassword: z.string().min(1, "New Password is required."),
  confirmNewPassword: z.string().min(1, "Password is required."),
});

export const CombinedPasswordFormSchema = z.union([
  ForgotPasswordFormSchema,
  OtpFormSchema,
  ResetPasswordFormSchema,
]);
