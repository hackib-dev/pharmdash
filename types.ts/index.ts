import * as z from "zod";
import { store } from "@/store";
import { LoginFormSchema } from "@/app/(pages)/login/validations";
import { SignUpFormSchema } from "@/app/(pages)/signup/validations";
import { CombinedPasswordFormSchema } from "@/app/(pages)/ssword/validations";
import {
  AddDrugFormSchema,
  SellDrugsFormSchema,
} from "@/app/(pages)/dashboard/pharmacy-actions/validations";

const UserSchema = z.object({
  jwt: z.string(),
  isAuthenticated: z.boolean(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userRole: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type SignUpFormData = z.infer<typeof SignUpFormSchema>;
export type AddDrugFormData = z.infer<typeof AddDrugFormSchema>;
export type SellDrugFormData = z.infer<typeof SellDrugsFormSchema>;
export type CombinedPasswordFormData = z.infer<
  typeof CombinedPasswordFormSchema
>;
