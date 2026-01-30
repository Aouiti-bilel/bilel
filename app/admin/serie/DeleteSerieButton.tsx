"use client";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState, useTransition } from "react";
import { deleteSerie } from "./actions";

export function DeleteSerieButton({ serieId }: { serieId: string }) {
    const [_, action] = useActionState(
        async () => {
            await deleteSerie(serieId);
            return null;
        },
        null
    );

    const [isPending, startTransition] = useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this serie?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isPending}
                        onClick={() => startTransition(action)}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
