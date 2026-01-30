// app/admin/series/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";


type ActionState = {
  success: boolean;
  error?: string;
};

export async function createSeries(_: ActionState, formData: FormData): Promise<ActionState> {

  const title = formData.get("title")?.toString().trim();
  const description = (formData.get("description")?.toString() ?? "").trim();
  const coverImage = formData.get("coverImage") as File
  if (!title) throw new Error("Title is required");
  /* -------------------------
   * 2. Upload images
   * ------------------------- */
  console.log("UPLOAD COVER IMAGE:", coverImage);
  const coverImageBlob = await put(
    `series/${Date.now()}-${title}-cover`,
    coverImage ,
    {
      access: "public",
      addRandomSuffix: true,
    }
  );
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  try {
    await prisma.series.create({
      data: { title, description, coverImage: coverImageBlob.url, slug },
    });

    return { success: true };

  } catch (error) {
    console.error("CREATE SERIES ERROR:", error);
  }


  revalidatePath("/admin/series");
  return { success: true };
}

export async function deleteSerie(serieId: string) {
    if (!serieId) {
        throw new Error("Serie ID is required");
    }

    await prisma.series.delete({
        where: { id: serieId },
    });

    // refresh admin list
    revalidatePath("/admin/serie");
}