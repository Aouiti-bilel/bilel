'use client';
import { Button } from "./ui/button";
import { useState } from "react";
import Article1Modal from "./Article1Modal";
import Article2Modal from "./Article2Modal";
import Article3Modal from "./Article3Modal";
import Article4Modal from "./Article4Modal";

type Doc = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
};

const docs: Doc[] = [
  {
    id: "1",
    title: "Custom GraphQL Directives",
    excerpt: "GraphQL Directives allow you to extend your schema with reusable behaviors.",
    slug: "graphql-directives",
  },
  {
    id: "2",
    title: "Middleware in Node.js (Express)",
    excerpt: "Middleware is the core concept that powers Express applications.",
    slug: "middleware-nodejs",
  },
  {
    id: "3",
    title: "Subscriptions & Socket.io Explained",
    excerpt: "Understanding Subscriptions & Real-Time Communication with Socket.io",
    slug: "subscriptions-socketio",
  },
  {
    id: "4",
    title: "File Uploads in Express (Multer) & GraphQL",
    excerpt: "  Handling file uploads is a core part of modern applications — whether for user profile pictures, documents, images, or media assets.",
    slug: "file-uploads-express-graphql",
  },
];

export default function DocumentationPreview() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <>
      {openModal === "graphql-directives" && <Article1Modal onClose={() => setOpenModal(null)} />}
      {openModal === "middleware-nodejs" && <Article2Modal onClose={() => setOpenModal(null)} />}
      {openModal === "subscriptions-socketio" && <Article3Modal onClose={() => setOpenModal(null)} />}
      {openModal === "file-uploads-express-graphql" && <Article4Modal onClose={() => setOpenModal(null)} />}
      <section className="container mx-auto px-4 my-16 py-16 bg-gray-50 dark:bg-neutral-900 rounded-xl">
        <h2 className="text-3xl font-bold mb-8">Documentation & Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docs.map((doc) => (
            <div key={doc.id} className="p-6 border rounded-xl hover:shadow-lg transition bg-white dark:bg-neutral-800">
              <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
              <p className="text-gray-500">{doc.excerpt}</p>
              <Button
                onClick={() => setOpenModal(doc.slug)}
              // href={`/docs/${doc.slug}`}
              >
                Read tutorial →
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
