
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogDetailPage from "./Main";
import { Metadata } from "next";

;

type Props = {
    params: { id: string };
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params;
    const post = await prisma.blog.findUnique({
        where: { id: id },
    });

    if (!post || !post.status) {
        return {
            title: "Not found",
            robots: { index: false },
        };
    }

    const title = post.title;
    const description = post.description;
    const image = post.images?.[0];

    return {
        title,
        description,
        alternates: {
            canonical: `https://bilel-laouiti.vercel.app/blog/${post.id}`,
        },
        openGraph: {
            type: "article",
            title,
            description,
            url: `https://bilel-laouiti.vercel.app/blog/${post.id}`,
            images: image ? [{ url: image }] : [],
            publishedTime: post.createdAt.toISOString(),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : [],
        },
    };
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

    return <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.title,
                    description: post.description,
                    image: post.images?.[0],
                    datePublished: post.createdAt,
                    dateModified: post.updatedAt,
                    author: {
                        "@type": "Person",
                        name: "Bilel Laouiti",
                    },
                    publisher: {
                        "@type": "Person",
                        name: "Bilel Laouiti",
                    },
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `https://bilel-laouiti.vercel.app/blog/${post.id}`,
                    },
                }),
            }}
        />

        <BlogDetailPage post={post} relatedPosts={relatedPosts} />;
    </>

}
