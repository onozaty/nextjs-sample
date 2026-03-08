import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "タイトルは必須です。" })
    .max(100, { message: "タイトルは100文字以内で入力してください。" }),
  content: z
    .string()
    .trim()
    .max(10000, { message: "本文は10,000文字以内で入力してください。" }),
});

export type PostFormState = {
  errors: {
    title?: string[];
    content?: string[];
  };
  values: {
    title: string;
    content: string;
  };
};
