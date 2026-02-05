"use server";

import prisma from "@/lib/prisma";
import { slugifyFrench } from "@/lib/utils";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

type ActionState = {
    success: boolean;
    error?: string;
};

export async function createPost(
    _: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {
        /* -------------------------
         * 1. Read form data
         * ------------------------- */
        const title = formData.get("title")?.toString().trim();
        const description = (formData.get("description")?.toString() ?? "").trim();
        const content = formData.get("content")?.toString();
        const images = formData.getAll("images") as File[];

        if (!title || !content) {
            return {
                success: false,
                error: "Le titre et le contenu sont obligatoires",
            };
        }

        /* -------------------------
         * 2. Upload images
         * ------------------------- */
        const imageUrls: string[] = [];

        for (const file of images) {
            if (!file || file.size === 0) continue;

            const blob = await put(
                `blogs/${Date.now()}-${file.name}`,
                file,
                {
                    access: "public",
                    addRandomSuffix: true,
                }
            );

            imageUrls.push(blob.url);
        }
        const slug = slugifyFrench(title);

        /* -------------------------
         * 3. Save blog in database
         * ------------------------- */
        await prisma.blog.create({
            data: {
                authorId: "1", // TODO: dynamic author
                title,
                slug,
                description,
                content,
                images: imageUrls, // Prisma String[]
            },
        });

        /* -------------------------
         * 4. Revalidate & return
         * ------------------------- */
        revalidatePath("/admin/blogs");

        return { success: true };
    } catch (error) {
        console.error("CREATE BLOG ERROR:", error);

        return {
            success: false,
            error: "Erreur lors de la création de l’article",
        };
    }
}
export async function updateBlog(_: ActionState, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    let seriesId = formData.get("seriesId") as string | null;
    if (seriesId === "none") {
        seriesId = null;
    }

    const existingImages = JSON.parse(
        formData.get("existingImages") as string
    ) as string[];

    const files = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];
    if (files.length > 0)
        for (const file of files) {
            if (file.size === 0) continue;
            const blob = await put(file.name, file, {
                access: "public",
                addRandomSuffix: true,
            });
            uploadedImages.push(blob.url);
        }
    const slug = slugifyFrench(title);

    await prisma.blog.update({
        where: { id },
        data: {
            title,
            description,
            slug,
            content,
            seriesId,
            images: [...existingImages, ...uploadedImages],
        },
    });
    revalidatePath(`/admin/blog/${id}`);

    return { success: true };
}
export async function deleteBlog(blogId: string) {
    if (!blogId) {
        throw new Error("Blog ID is required");
    }

    await prisma.blog.delete({
        where: { id: blogId },
    });

    // refresh admin list
    revalidatePath(`/admin/blog/${blogId}`);
}
export async function toggleBlogStatus(blogId: string) {
    if (!blogId) {
        throw new Error("Blog ID is required");
    }
    const blog = await prisma.blog.findUnique({
        where: { id: blogId },
    });

    await prisma.blog.update({
        where: { id: blogId },
        data: {
            status: !blog?.status,
        },
    });

    revalidatePath("/admin/blogs");
}