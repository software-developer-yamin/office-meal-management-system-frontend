import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email().min(1, "email is required"),
  password: z.string().min(8, " password is required"),
});

export const userSchema = z.object({
  email: z.string().email().min(1, "email is required"),
  name: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  isBanned: z.boolean(),
  password: z.string().min(8, "password is required"),
});

export const itemSchema = z.object({
  name: z.string().min(1, "name is required"),
  category: z.enum(["PROTEIN", "STARCH", "VEGETABLE", "OTHER"]),
});
