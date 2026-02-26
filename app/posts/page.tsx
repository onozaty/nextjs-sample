import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Create your first post!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.content && (
                <p className="text-gray-600 mt-2">{post.content}</p>
              )}
              <time className="text-sm text-gray-400 mt-2 block">
                {post.createdAt.toLocaleDateString("ja-JP")}
              </time>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/"
        className="inline-block mt-8 text-blue-600 hover:underline"
      >
        ← Home
      </Link>
    </main>
  );
}
