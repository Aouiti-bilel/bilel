"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Article2Modal({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-xl font-bold mb-4">Middleware in Node.js (Express)</h2>

          <p className="mb-3">
            Middleware is the core concept that powers Express applications. It allows you to
            intercept and process incoming requests before they reach your route handlers.
            This makes middleware ideal for tasks like authentication, logging, validation,
            error handling, and more.
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2">What Is Middleware?</h3>
          <p className="mb-3">
            In Express, middleware is simply a function that receives the request, the
            response, and a <code>next()</code> function. It can perform actions, modify
            data, respond directly, or pass control to the next middleware.
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`function middleware(req, res, next) {
  console.log("Request received");
  next(); // Pass to the next middleware
}`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">How Middleware Works</h3>
          <p className="mb-3">
            Every incoming request flows through a chain of middleware functions. Each one
            can decide whether to continue the chain or end the request.
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`Request → [Middleware] → [Middleware] → [Route Handler] → Response`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Types of Middleware</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Application-level middleware</strong> – runs on all routes.</li>
            <li><strong>Route-level middleware</strong> – runs on specific routes.</li>
            <li><strong>Built-in middleware</strong> – like <code>express.json()</code>.</li>
            <li><strong>Third-party middleware</strong> – like <code>cors</code> or <code>morgan</code>.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Application-level Example</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Route-level Middleware Example</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/dashboard", auth, (req, res) => {
  res.send("Welcome!");
});`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Error-handling Middleware</h3>
          <p className="mb-3">
            Error middleware is special because it requires four parameters:
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
}

app.use(errorHandler);`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Real-world Example: Authentication</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }
  next();
}

app.get("/profile", auth, (req, res) => {
  res.json({ user: "John Doe" });
});`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Why Middleware Matters</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Keeps route handlers clean</li>
            <li>Enables reusability and modularity</li>
            <li>Controls the request lifecycle</li>
            <li>Provides powerful tools for security and validation</li>
          </ul>

          <p className="mt-4">
            Middleware is the backbone of Express. Once you understand how it works, you
            understand how Express handles every request under the hood.
          </p>
        </>



      </motion.div>
    </AnimatePresence>
  );
}
