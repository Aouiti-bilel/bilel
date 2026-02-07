"use client";

import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { updateBlog } from "../actions";
import { Blog, Serie } from "@/app/generated/prisma/browser";
import { SeriesField } from "../SeriesField";



type Props = {
    blog: Blog;
    series: Serie[];
};

export default function EditPost({ blog, series }: Props) {
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(blog.images);

    const [state, actionForm, pending] = useActionState(updateBlog, {
        success: false,
    });

    /* preview new images */
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setNewImages(files);
        setPreviews(files.map((f) => URL.createObjectURL(f)));
    };

    /* remove existing image */
    const removeExistingImage = (url: string) => {
        setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    return (
        <Card className="mx-auto max-w-5xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    ✏️ Modifier l’article
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Mettez à jour le contenu de votre article
                </p>
            </CardHeader>

            <CardContent>
                <form action={actionForm} className="space-y-6">
                    {/* REQUIRED */}
                    <input type="hidden" name="id" value={blog.id} />
                    <input
                        type="hidden"
                        name="existingImages"
                        value={JSON.stringify(existingImages)}
                    />

                    {/* TITLE */}
                    <div className="space-y-1">
                        <Label>Titre</Label>
                        <Input required name="title" defaultValue={blog.title} />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1">
                        <Label>Description courte</Label>
                        <Textarea
                            name="description"
                            rows={3}
                            defaultValue={blog.description}
                            required
                        />
                    </div>

                    {/* EXISTING IMAGES */}
                    {existingImages.length > 0 && (
                        <div className="space-y-2">
                            <Label>Images existantes</Label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {existingImages.map((src) => (
                                    <div
                                        key={src}
                                        className="relative aspect-square overflow-hidden rounded-lg border"
                                    >
                                        <Image
                                            src={src}
                                            alt="blog image"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(src)}
                                            className="absolute right-1 top-1 rounded-full bg-background p-1 shadow"
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ADD NEW IMAGES */}
                    <div className="space-y-2">
                        <Label>Ajouter des images</Label>
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm hover:bg-muted transition">
                            <Upload className="h-4 w-4" />
                            Ajouter des images
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImagesChange}
                                required={false}
                            />
                        </label>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {previews.map((src, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square overflow-hidden rounded-lg border"
                                    >
                                        <Image src={src} alt="preview" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-2">
                        <Label>Contenu</Label>
                        <Editor

                            apiKey="rk0j2ac4vzoanqc5lmp4mqu780w0t7bnlxjrk86caur5bd7l"
                            textareaName="content"
                            initialValue={blog.content}

                            init={{
                                height: 800,
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
                    </div>
                    <SeriesField series={series} defaultValue={blog.seriesId} />

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="reset">
                            Annuler
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Mise à jour..." : "Mettre à jour"}
                        </Button>
                    </div>

                    {state.success && (
                        <p className="text-center text-sm text-green-600">
                            ✅ Article mis à jour avec succès
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
