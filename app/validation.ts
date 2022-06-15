import { z } from "zod";

export const Email = z.string().email().max(50);
export const Password = z.string().min(8).max(64);
