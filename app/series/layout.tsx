import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SeriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
        <Navbar />
        <div className="min-h-screen bg-background py-10">{children}</div>;
        <Footer />
    </>
}