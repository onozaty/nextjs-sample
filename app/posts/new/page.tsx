import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            rows={5}
            placeholder="Enter post content (optional)"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create</Button>
          <Button variant="outline" asChild>
            <Link href="/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}
