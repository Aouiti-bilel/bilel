"use client";

import Image from "next/image";
import Link from "next/link";

interface SeriesDetailsProps {
  series: {
    title: string;
    description?: string | null;
    coverImage?: string | null;
    posts: {
      id: string;
      title: string;
      slug: string;
      description?: string | null;
      createdAt: Date;
    }[];
  };
}

export default function SeriesDetails({ series }: SeriesDetailsProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 space-y-10">
      {/* HEADER */}
      <div className="space-y-6">
        {series.coverImage && (
          <div className="relative h-64 w-full overflow-hidden rounded-2xl border">
            <Image
              src={series.coverImage}
              alt={series.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{series.title}</h1>
          {series.description && (
           <p
                    className="rich-content"
                    dangerouslySetInnerHTML={{ __html: series.description }}
                />      
          )}
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Articles in this series</h2>

        <ol className="space-y-4">
          {series.posts.map((post, index) => (
            <li
              key={post.id}
              className="group rounded-xl border p-4 transition hover:border-primary hover:bg-muted/40"
            >
              <Link href={`/blog/${post.slug}`} className="flex gap-4">
                {/* Index */}
                <span className="text-sm font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  {post.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
