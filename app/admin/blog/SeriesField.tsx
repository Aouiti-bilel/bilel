"use client";

import { Series } from "@/app/generated/prisma/browser";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SeriesField({ series, defaultValue }: { series: Series[], defaultValue?: string }) {


    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Series</label>

            <Select
                name="seriesSlug"
                defaultValue={defaultValue ?? "none"}
            >
                <SelectTrigger>
                    <SelectValue placeholder="No series" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="none">None</SelectItem>

                    {series.map((s) => (
                        <SelectItem key={s.slug} value={s.slug}>
                            {s.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
