import prisma from "@/lib/prisma";
import BlogGrid from "./BlogGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Bilel Laouiti",
  description:
    "Technical articles about JavaScript, backend engineering, system design, and software architecture.",
};
export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    where: {
      status: true, // ✅ published only
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="container mx-auto space-y-10 py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Thoughts, tutorials, and updates
        </p>
      </div>

      {/* Grid */}
      <BlogGrid posts={posts} />
    </section>
  );
}
