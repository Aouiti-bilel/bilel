"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Blog } from "@/app/generated/prisma/browser";

import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";



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
            <div className="flex justify-end items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
