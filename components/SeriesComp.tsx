"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Serie } from "@/app/generated/prisma/browser";



interface Props {
  series: Serie[];
}

export default function SeriesComp({ series }: Props) {
  console.log("Series data:");
  if (!series.length) return null;
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-3xl font-bold">Technical References</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our structured series of technical articles, organized to help you understand complex topics clearly.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/series/${s.slug}`}
            className="group block overflow-hidden rounded-2xl border border-border bg-background shadow transition-all duration-300 hover:border-primary hover:shadow-lg"
          >
            {s.coverImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={s.coverImage}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                {s.title}
              </h3>

              {s.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">{s.description}</p>
              )}

              {/* <p className="text-xs text-muted-foreground mt-1">{s.posts.length} articles</p> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}