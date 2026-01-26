import prisma from "@/lib/prisma";
import Main from "./Main";


type Props = {
    searchParams: {
        q?: string;
        page?: string;
    };
};
git 