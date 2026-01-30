"use client";

import { Series } from "@/app/generated/prisma/browser";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SeriesFieldProps = {
    series: Series[],
    defaultValue: string | null
}
export function SeriesField({ series, defaultValue }: SeriesFieldProps) {


    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Series</label>

            <Select
                name="seriesId"
                defaultValue={defaultValue ?? "none"}
            >
                <SelectTrigger>
                    <SelectValue placeholder="No series" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="none">None</SelectItem>

                    {series.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                            {s.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
