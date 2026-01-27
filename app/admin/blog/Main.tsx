"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Blog } from "@/app/generated/prisma/browser";
import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PublishToggle } from "./PublishToggle";
import { DeleteBlogButton } from "./DeleteBlogButton";

interface Props {
    posts: Blog[];
    totalPages: number;
    page: number;
}

export default function Main({ posts, totalPages, page }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [debouncedSearch] = useDebounce(search, 400);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set("q", debouncedSearch);
            params.set("page", "1");
        } else {
            params.delete("q");
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [debouncedSearch, router, searchParams]);

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Blog posts</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and publish your content
                    </p>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Input
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Create button */}
                    <Link href="/admin/blog/new">
                        <Button variant="outline" className="gap-2" >
                            <Plus className="h-4 w-4" />
                            New post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.images?.[0] || "/placeholder.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />

                            {/* Status badge */}
                            <span
                                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium
        ${post.status
                                        ? "bg-emerald-600 text-white"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {post.status ? "Published" : "Draft"}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3 p-4">
                            <h3 className="line-clamp-2 text-base font-semibold">
                                {post.title}
                            </h3>

                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                {post.description}
                            </p>

                            {/* Footer actions */}
                            <div className="mt-4 flex items-center justify-between border-t pt-3">
                                <span className="text-xs text-muted-foreground">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>

                                <div className="flex items-center gap-2">
                                    <PublishToggle
                                        blogId={post.id}
                                        status={post.status}
                                    />

                                    <Link href={`/admin/blog/${post.id}`}>
                                        <Button size="sm" variant="outline">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteBlogButton blogId={post.id} />
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col gap-4 rounded-2xl border bg-card px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Page{" "}
                        <span className="font-medium text-foreground">{page}</span> sur{" "}
                        <span className="font-medium text-foreground">
                            {totalPages}
                        </span>
                    </p>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => goToPage(page - 1)}
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Précédent
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => goToPage(page + 1)}
                        >
                            Suivant
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
