"use client";

import { useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { Upload, ImageIcon, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { createPost } from "../actions";
import { SeriesField } from "../SeriesField";
import { Series } from "@/app/generated/prisma/browser";



export default function NewPost({ series }: { series: Series[] }) {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);

        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };
    const [state, actionForm, pending] = useActionState(createPost, {
        success: false,
    });
    /* remove existing image */
    const removeExistingImage = (url: string) => {
        setPreviews((prev) => prev.filter((img) => img !== url));
    };
    if (state.success) {
        return (
            <Card className="mx-auto max-w-3xl text-center">
                <CardContent className="py-16 space-y-4">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                    <h2 className="text-xl font-semibold">Succès</h2>
                    <p className="text-muted-foreground">Article enregistré avec succès ✨</p>

                    <div className="flex justify-center gap-3 pt-6">
                        <Button onClick={() => location.reload()}>
                            Créer un autre article
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/blog">Retour à la liste</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="mx-auto max-w-5xl">
            {/* LOADING OVERLAY */}
            {pending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    ✍️ Créer un article
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Rédigez un article informatif et professionnel
                </p>
            </CardHeader>

            <CardContent>
                <form action={actionForm} className="space-y-6">
                    {/* TITLE */}
                    <div className="space-y-1">
                        <Label>Titre</Label>
                        <Input
                            name="title"
                            placeholder="Titre de l’article"
                            required
                        />
                    </div>

                    {/* SHORT DESCRIPTION */}
                    <div className="space-y-1">
                        <Label>Description courte</Label>
                        <Textarea
                            name="description"
                            rows={3}
                            placeholder="Résumé rapide de l’article"
                            required
                        />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div className="space-y-2">
                        <Label>Images</Label>

                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground hover:bg-muted transition">
                            <Upload className="h-4 w-4" />
                            Sélectionner des images
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImagesChange}
                                required
                            />
                        </label>

                        {/* PREVIEWS */}
                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {previews.map((src, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square overflow-hidden rounded-lg border"
                                    >
                                        <Image
                                            src={src}
                                            alt="preview"
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
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-2">
                        <Label>Contenu</Label>
                        <Editor
                            apiKey="rk0j2ac4vzoanqc5lmp4mqu780w0t7bnlxjrk86caur5bd7l"
                            // tinymceScriptSrc="/tinymce/tinymce.min.js"

                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    "lists",
                                    "link",
                                    "image",
                                    "table",
                                    "code",
                                    "wordcount",
                                    "codesample"
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic underline | bullist numlist | link image | codesample",
                                skin: "oxide",
                                content_css: "default",
                                codesample_languages: [
                                    { text: "JavaScript", value: "javascript" },
                                    { text: "TypeScript", value: "typescript" },
                                    { text: "HTML", value: "markup" },
                                    { text: "CSS", value: "css" },
                                    { text: "JSON", value: "json" },
                                    { text: "Bash", value: "bash" },
                                ],
                            }}
                            textareaName="content"
                        />
                    </div>
                    <SeriesField series={series} defaultValue={"None"} />

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="reset">
                            Annuler
                        </Button>
                        <Button type="submit">
                            Publier l’article
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

