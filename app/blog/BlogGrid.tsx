import Image from "next/image";
import Link from "next/link";
import { Blog } from "../generated/prisma/browser";



export default function BlogGrid({ posts }: { posts: Blog[] }) {
    if (!posts.length) {
        return (
            <p className="text-center text-muted-foreground">
                No articles published yet.
            </p>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-lg"
                >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                        <Image
                            src={post.images?.[0] || "/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-5">
                        <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>

                        <h2 className="line-clamp-2 text-lg font-semibold">
                            {post.title}
                        </h2>

                        <p className="line-clamp-3 text-sm text-muted-foreground">
                            {post.description}
                        </p>

                        <span className="mt-2 text-sm font-medium text-primary">
                            Read more →
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
