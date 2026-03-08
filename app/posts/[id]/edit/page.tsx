import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditForm } from "./edit-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) notFound();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <EditForm
        id={post.id}
        initialValues={{ title: post.title, content: post.content ?? "" }}
      />
    </main>
  );
}
