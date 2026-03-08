"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const postSchema = z.object({
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

export async function createPost(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const rawValues = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const result = postSchema.safeParse(rawValues);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      values: rawValues,
    };
  }

  await prisma.post.create({
    data: {
      title: result.data.title,
      content: result.data.content || null,
    },
  });

  redirect("/posts");
}
