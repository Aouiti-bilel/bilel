'use client';
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Blog } from "@/app/generated/prisma/browser";



type Props = {
    post: Blog;
    relatedPosts: { id: string; title: string }[];
    mdxSource: MDXRemoteSerializeResult;
};
export default  function BlogDetailPage({ post, relatedPosts, mdxSource }: Props) {


    return (
        <main className="container mx-auto py-16 space-y-10">
            {/* Header */}
            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <p className="text-sm text-muted-foreground">
                    Published on {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {post.images?.[0] && (
                    <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                        <Image
                            src={post.images[0]}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
            </div>

            {/* Content */}
            <article className="mx-auto max-w-3xl prose dark:prose-invert">
                <MDXRemote {...mdxSource} />
            </article>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
                <section className="mx-auto max-w-3xl space-y-4">
                    <h2 className="text-xl font-semibold">Related Posts</h2>
                    <ul className="space-y-2">
                        {relatedPosts.map((p) => (
                            <li key={p.id}>
                                <Link
                                    href={`/blog/${p.id}`}
                                    className="text-primary hover:underline"
                                >
                                    {p.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Back link */}
            <div className="mx-auto max-w-3xl">
                <Link href="/blog">
                    <button className="mt-6 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition">
                        ← Back to Blog
                    </button>
                </Link>
            </div>
        </main>
    );
}