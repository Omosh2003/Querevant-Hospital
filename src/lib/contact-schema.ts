import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please tell us your name." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be under 255 characters." }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone number must be under 30 characters." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please tell us a little more (at least 10 characters)." })
    .max(1000, { message: "Message must be under 1000 characters." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
