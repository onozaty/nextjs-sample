import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="/posts/new">New Post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Create your first post!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Card className="hover:shadow-md transition">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {post.createdAt.toLocaleDateString("ja-JP")}
                  </CardDescription>
                </CardHeader>
                {post.content && (
                  <CardContent>
                    <p className="text-muted-foreground">{post.content}</p>
                  </CardContent>
                )}
              </Card>
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
