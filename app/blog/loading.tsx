import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-2xl border bg-card"
                >
                    <Skeleton className="h-56 w-full" />
                    <div className="space-y-3 p-5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}
