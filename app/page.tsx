import prisma from "@/lib/prisma";
import HomePage from "./Main";

export default async function Page() {
  const series = await prisma.series.findMany({
    include: {
      posts: { where: { status: true } }, // only published posts
    },
    orderBy: { createdAt: "desc" },
  });
  return <HomePage series={series} />
}

