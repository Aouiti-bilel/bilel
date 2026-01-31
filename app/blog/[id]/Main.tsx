"use client";

import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/app/generated/prisma/browser";
import { useEffect } from "react";
import Prism from "@/lib/prism";

type Props = {
    post: Blog;
    relatedPosts: { id: string; title: string }[];
};



const BlogDetails = ({ post, relatedPosts }: Props) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <article className="min-h-screen  pb-20">
            <header className="pt-16 pb-10 px-4 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold  tracking-tight mb-6">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center space-x-4">
                    <img
                        src="/me.png"
                        alt="Author"
                        className="w-12 h-12 rounded-full border border-gray-200"
                    />
                    <div className="text-left">
                        <p className="text-sm font-semibold ">Bilel Laouiti</p>
                        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()} </p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 mb-12">
                <div className="relative w-full h-[400px]   ">
                    <Image
                        src={post.images[0]}
                        alt={post.title}
                        fill

                        className="contain rounded-2xl shadow-lg"
                    />
                </div>
                <div className="lg:col-span-6 prose prose-lg prose- max-w-none dark:prose-invert">
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                </div>
            </main>

        </article>
    )

}
export default BlogDetails