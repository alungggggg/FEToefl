import { z } from "zod";

export const usersScema = z.object({
  username: z
    .string()
    .nonempty({
      message: "Username is required",
    })
    .min(6, {
      message: "Username must be at least 6 characters long",
    })
    .max(16, {
      message: "Username must be at most 16 characters long",
    }),
  name: z
    .string()
    .nonempty({
      message: "Name is required",
    })
    .max(50, {
      message: "Name must be at most 50 characters long",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .nonempty({
      message: "Password is required",
    }),
    // .max(16, {
    //   message: "Password must be at most 16 characters long",
    // })
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    //   {
    //     message:
    //       "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    //   }
    // ),
  exam: z.string().nonempty({
    message: "Exam is required",
  }),
});
