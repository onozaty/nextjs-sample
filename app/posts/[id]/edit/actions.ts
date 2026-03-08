"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { postSchema, type PostFormState } from "@/app/posts/schema";

export async function updatePost(
  id: number,
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

  await prisma.post.update({
    where: { id },
    data: {
      title: result.data.title,
      content: result.data.content || null,
    },
  });

  redirect("/posts");
}
