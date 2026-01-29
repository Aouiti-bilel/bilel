"use client";

import { useActionState, useState } from "react";
import { createSeries } from "../actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";

export default function NewSeriesForm() {
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const [state, actionForm, pending] = useActionState(createSeries, {
        success: false,
    });
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) setCoverImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeCover = () => setCoverImage(null);

    return (
        <form action={actionForm} className="space-y-4 max-w-lg">
            {/* Title */}
            <Input
                name="title"
                placeholder="Series Title"
                required
            />

            {/* Description */}
            <Textarea
                name="description"
                placeholder="Series Description"
            />

            {/* Cover Image */}
            <div className="space-y-2">
                <Label>Cover Image</Label>

                {!coverImage ? (
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground hover:bg-muted transition">
                        <Upload className="h-4 w-4" />
                        Select cover image
                        <input
                            type="file"
                            name="coverImage"
                            accept="image/*"
                            className="sr-only"
                            // onChange={handleCoverChange}
                            required
                        />
                    </label>
                ) : (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                        <button
                            type="button"
                            onClick={removeCover}
                            className="absolute right-1 top-1 rounded-full bg-background p-1 shadow"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                    </div>
                )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create Series"}
            </Button>

        </form>
    );
}
