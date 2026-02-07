// app/admin/series/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { DeleteSerieButton } from "./DeleteSerieButton";
import Image from "next/image";

export default async function SeriesAdminPage() {
  const series = await prisma.serie.findMany({
    include: { posts: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Series</h1>
        <Link href="/admin/serie/new">
          <Button>Create Series</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <div key={s.id} className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
            <div className="relative h-48 overflow-hidden">
              {s.coverImage && (
                <Image
                  src={s.coverImage}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-3 p-4">

              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{s.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.posts.length} posts</p>
            </div>
            <div className="mt-4 flex items-center justify-end border-t pt-3">
              {/* <Link href={`/admin/series/${s.id}/edit`}>
                <Button size="sm" variant="outline">Edit</Button>
              </Link> */}
              <DeleteSerieButton serieId={s.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
