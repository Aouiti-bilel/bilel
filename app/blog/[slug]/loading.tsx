import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-16 space-y-8">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-6 w-1/6" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-8 w-32 rounded-lg" />
    </main>
  );
}
