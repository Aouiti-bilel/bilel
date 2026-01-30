
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogDetailPage from "./Main";

interface Props {
    params: { id: string };
}

export default async function BlogDetail({ params }: Props) {
    const { id } = await params;

    const post = await prisma.blog.findUnique({
        where: { id },

    });
    const relatedPosts = await prisma.blog.findMany({
        where: { status: true, NOT: { id: id } },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { title: true, id: true },
    });

    if (!post || !post.status) return notFound();

    return <BlogDetailPage post={post} relatedPosts={relatedPosts} />;

}
