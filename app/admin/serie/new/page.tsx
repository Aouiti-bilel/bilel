import prisma from "@/lib/prisma";
import NewSeriesForm from "./SerieForm";

export default async function NewSeriePage() {
    const series = await prisma.serie.findMany({
        include: { posts: { where: { status: true }, orderBy: { order: 'asc' } } }
    });
    return (
        <div className="grid grid-cols-2 gap-4">
            <section>
                <h1 className="text-2xl font-bold mb-4">Create New Serie</h1>
                <NewSeriesForm />
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-3">Existing Series</h2>
                <ul className="space-y-2">
                    {series.map((serie) => (
                        <li key={serie.id} className="p-4 border rounded-md">
                            <h3 className="text-lg font-medium">{serie.title}</h3>
                            <p className="text-sm text-muted-foreground">{serie.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}