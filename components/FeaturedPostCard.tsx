"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}
export default function FeaturedPostCard({ post }: { post:  Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="
        border bg-background/60 backdrop-blur-md 
        shadow-lg overflow-hidden transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1
      ">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="
              object-cover transition-all duration-500 
              group-hover:scale-105
            "
          />
          {/* category badge */}
          <Badge 
            className="absolute top-3 left-3 bg-primary/90 text-white"
          >
            {post.category}
          </Badge>
        </div>

        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span className="font-medium group-hover:underline">Read more →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
