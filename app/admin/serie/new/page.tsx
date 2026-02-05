"use client";

import { useActionState, useState } from "react";
import { createSeries } from "../actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

export default function NewSeriesForm() {
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const [state, actionForm, pending] = useActionState(createSeries, {
        success: false,
    });
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverImage(URL.createObjectURL(file));
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
            <Editor
                apiKey="rk0j2ac4vzoanqc5lmp4mqu780w0t7bnlxjrk86caur5bd7l"
                textareaName="description"
                init={{
                    height: 400,
                    menubar: 'file edit view insert format tools table tc help',
                    // plugins: ["lists", "link", "image", "table", "code"],
                    plugins: 'preview visualblocks visualchars fullscreen image link media  codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   imagetools textpattern noneditable help    quickbars  emoticons  ',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist  | forecolor backcolor casechange   removeformat | pagebreak | charmap emoticons | fullscreen  preview | image media  anchor codesample | a11ycheck ltr rtl |  ',
                    mobile: {
                        theme: 'mobile',
                        toolbar: ['undo', 'bold']
                    },
                    theme_advanced_toolbar_align: 'center',
                    autosave_interval: '3s',

                    content_css: 'default'
                }}
            />
            {/* Cover Image */}
            <div className="space-y-2">
                <Label>Cover Image</Label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground hover:bg-muted transition">
                    <Upload className="h-4 w-4" />
                    Select cover image
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        className="sr-only"
                        onChangeCapture={handleCoverChange}
                        required
                    />
                </label>

                {coverImage && <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                    <button
                        type="button"
                        onClick={removeCover}
                        className="absolute right-1 top-1 rounded-full bg-background p-1 shadow"
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                </div>}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create Series"}
            </Button>

        </form>
    );
}
