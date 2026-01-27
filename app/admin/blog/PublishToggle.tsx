"use client";

import { Switch } from "@/components/ui/switch";
import { useActionState, useTransition } from "react";
import { toggleBlogStatus } from "./actions";

export function PublishToggle({
    blogId,
    status,
}: {
    blogId: string;
    status: boolean;
}) {
    const [_, action] = useActionState(
        async () => {
            await toggleBlogStatus(blogId);
            return null;
        },
        null
    );

    const [isPending, startTransition] = useTransition();

    return (
        <Switch
            checked={status}
            disabled={isPending}
            onCheckedChange={() => startTransition(action)}
        />
    );
}
