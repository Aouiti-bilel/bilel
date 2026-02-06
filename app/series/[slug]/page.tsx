import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SeriesDetails from "./SeriesDetails";

interface Props {
    params: { slug: string };
}

export default async function SeriesPage({ params }: Props) {
    const props = await params;
    const slug =  props.slug;
    const series = await prisma.serie.findUnique({
        where: { slug: slug },
        include: {
            posts: {
                where: { status: true },
                orderBy: { createdAt: "asc" },
            },
        },
    });

    if (!series) notFound();

    return <SeriesDetails series={series} />;
}
