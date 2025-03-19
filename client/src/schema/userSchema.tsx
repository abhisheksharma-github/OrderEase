import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z.string().min(5, "FullName is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    contact: z.string().min(10, "Contact number must be 10 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupInputState = z.infer<typeof signupSchema>;

export const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.password, {
    message: "Passwords don't match",
    path: ["password"],
  });
export type LoginInputState = z.infer<typeof loginSchema>;
