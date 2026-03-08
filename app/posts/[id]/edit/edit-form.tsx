"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updatePost } from "./actions";

type Props = {
  id: number;
  initialValues: { title: string; content: string };
};

export function EditForm({ id, initialValues }: Props) {
  const boundAction = updatePost.bind(null, id);
  const [state, formAction, isPending] = useActionState(boundAction, {
    errors: {},
    values: initialValues,
  });

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Enter post title"
          defaultValue={state.values.title}
          aria-invalid={!!state.errors.title}
          aria-describedby={state.errors.title ? "title-error" : undefined}
        />
        {state.errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          rows={5}
          placeholder="Enter post content (optional)"
          defaultValue={state.values.content}
          aria-invalid={!!state.errors.content}
          aria-describedby={state.errors.content ? "content-error" : undefined}
        />
        {state.errors.content && (
          <p id="content-error" className="text-sm text-destructive">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/posts">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
