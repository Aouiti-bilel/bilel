"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Blog } from "@/lib/generated/prisma/browser";



interface Props {
    posts: Blog[];
    totalPages: number;
}

export default function Main({ posts, totalPages }: Props) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                        <div className="relative h-48 w-full">
                            <Image src={post.images[0]} alt={post.title} fill className="object-cover" />
                        </div>
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
                            <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                            <div className="flex justify-end">
                                <Link href={`/admin/blog/${post.id}/edit`}>
                                    <Button size="sm">Edit</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
                <Button
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i + 1}
                        size="sm"
                        variant={i + 1 === page ? "default" : "outline"}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
                <Button
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
