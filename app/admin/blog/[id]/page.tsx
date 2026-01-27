import prisma from "@/lib/prisma";
import NewPost from "./New";
import EditPost from "./EditPost";
// import EditPost from "./EditPost";

type Props = {
    params: {
        id: string;
    };
};

export default async function Blog(props: Props) {
    const { id } = await props.params;
    if (id === "new") {
        return <NewPost />;
    }
    const blog = await prisma.blog.findUnique({
        where: { id },
    });
    if (!blog) {
        return <div>Article non trouvé</div>;
    }
    return <EditPost blog={blog} />;
}