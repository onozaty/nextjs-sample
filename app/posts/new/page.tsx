import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

async function createPost(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      title: title.trim(),
      content: content.trim() || null,
    },
  });

  redirect("/posts");
}

export default function NewPostPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post content (optional)"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </button>
          <Link
            href="/posts"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
