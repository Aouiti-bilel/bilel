import prisma from "@/lib/prisma";
import Main from "./Main";


type Props = {
    searchParams: {
        q?: string;
        page?: string;
    };
};
const PAGE_SIZE = 20;

export default async function BlogListPage(props: Props) {
    const searchParams = await props?.searchParams

    const page = Number(searchParams.page || 1);
    const q = searchParams.q || "";


    const where: any = {
        AND: [
            q
                ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { description: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {},
        ],
    }
    const [posts, total] = await Promise.all([
        prisma.blog.findMany({
            where: where,
            orderBy: { createdAt: "desc" },
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
        }),
        prisma.blog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / PAGE_SIZE);
    return (
        <Main posts={posts} totalPages={totalPages} />
    );
}
