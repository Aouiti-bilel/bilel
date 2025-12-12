"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Article4Modal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="
          fixed inset-0 z-[210] 
          max-w-3xl mx-auto my-10 p-8 
          bg-white dark:bg-[#0f0f0f] rounded-2xl 
          overflow-y-auto shadow-xl border border-white/10
        "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>

        {/* Content */}
        <>
          <h2 className="text-2xl font-bold mb-4">
            File Uploads in Express (Multer) & GraphQL — Complete Guide
          </h2>

          <p className="mb-4">
            Handling file uploads is a core part of modern applications — whether for user profile
            pictures, documents, images, or media assets. In this article, we explore how file uploads work
            in a classic <strong>Node.js (Express)</strong> flow using <strong>multer</strong>, and how the process differs
            when working with <strong>GraphQL</strong>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">What is Multer?</h3>
          <p className="mb-4">
            Multer is a middleware for handling <strong>multipart/form-data</strong>, the format used when submitting
            files through forms. It allows Express apps to accept and store uploaded files easily.
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Handles file parsing</li>
            <li>Stores files on disk or memory</li>
            <li>Works directly with Express routes</li>
            <li>Supports single and multiple file uploads</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Express + Multer Setup Example</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`const express = require('express');
const multer = require('multer');

const app = express();

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});

app.listen(3000, () => console.log('Server running...'));`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Client-Side Upload (REST)</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`const formData = new FormData();
formData.append('file', selectedFile);

fetch('/upload', {
  method: 'POST',
  body: formData
});`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">How File Upload Works in GraphQL</h3>

          <p className="mb-4">
            GraphQL does not include file uploads in its core specification.
            To support uploads, most servers adopt the <strong>GraphQL multipart request spec</strong>, implemented by
            tools like <strong>graphql-upload</strong> or built-in support in Apollo Server.
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Files are sent as multipart/form-data</li>
            <li>GraphQL interprets file streams as special scalar types</li>
            <li>Resolvers receive the file as a stream</li>
            <li>You choose where/how to store the file</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">GraphQL Schema for File Upload</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`scalar Upload

type Mutation {
  uploadFile(file: Upload!): Boolean!
}`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Resolvers for File Upload</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`const resolvers = {
  Upload: GraphQLUpload, // from 'graphql-upload'

  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      const stream = createReadStream();
      const path = \`uploads/\${Date.now()}-\${filename}\`;

      await new Promise((resolve, reject) => {
        stream
          .pipe(require('fs').createWriteStream(path))
          .on('finish', resolve)
          .on('error', reject);
      });

      return true;
    },
  },
};`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Uploading a File from the Client (GraphQL)</h3>
          <p className="mb-4">Example using Apollo Client:</p>

          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`const UPLOAD_FILE = gql\`
  mutation ($file: Upload!) {
    uploadFile(file: $file)
  }
\`;

client.mutate({
  mutation: UPLOAD_FILE,
  variables: { file: selectedFile }
});`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Express Multer vs GraphQL Upload — Comparison</h3>

          <table className="table w-full mb-4">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Express + Multer</th>
                <th>GraphQL Upload</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Upload Format</td>
                <td>multipart/form-data</td>
                <td>multipart/form-data (spec-based)</td>
              </tr>
              <tr>
                <td>Parsing Mechanism</td>
                <td>Multer handles everything</td>
                <td>GraphQL server + Upload scalar resolver</td>
              </tr>
              <tr>
                <td>Integration</td>
                <td>Direct route (REST)</td>
                <td>Mutation with resolvers</td>
              </tr>
              <tr>
                <td>Ease of Use</td>
                <td>Very easy</td>
                <td>Moderate</td>
              </tr>
              <tr>
                <td>Best For</td>
                <td>REST APIs & simple forms</td>
                <td>Apps built primarily with GraphQL</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-6 mb-2">Real-World Use Cases</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>User profile images</li>
            <li>Product catalog images</li>
            <li>Documents (PDF, Word, Excel)</li>
            <li>Media uploads (audio/video)</li>
            <li>Drag & drop file managers</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Conclusion</h3>
          <p className="mb-4">
            File uploading is essential in most applications. Multer provides a fast and straightforward
            way for Express-based APIs to manage uploads.
            GraphQL, while more abstract, offers flexible file handling when paired with the multipart
            upload spec.
            Both approaches are powerful — the best choice depends on whether your API follows REST or
            GraphQL architecture.
          </p>
        </>
      </motion.div>
    </AnimatePresence>
  );
}
