// app/admin/series/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function SeriesAdminPage() {
  const series = await prisma.series.findMany({
    include: { posts: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Series</h1>
        <Link href="/admin/series/new">
          <Button>Create Series</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <div key={s.id} className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
            {s.coverImage && (
              <div className="relative h-36 w-full mb-4">
                <img src={s.coverImage} alt={s.title} className="object-cover rounded-lg" />
              </div>
            )}
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-3">{s.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">{s.posts.length} posts</p>

            <div className="flex justify-end mt-4 gap-2">
              <Link href={`/admin/series/${s.id}/edit`}>
                <Button size="sm" variant="outline">Edit</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
