"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Article3Modal({ onClose }: { onClose: () => void }) {
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
            Understanding Subscriptions & Real-Time Communication with Socket.io
          </h2>

          <p className="mb-4">
            Modern applications often require real-time updates: live chat, notifications, dashboards,
            collaborative tools... This is where <strong>subscriptions</strong> and real-time technologies like
            <strong> :contentReference[oaicite:0]{"index = 0"} </strong> come in.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">What Are Subscriptions?</h3>
          <p className="mb-4">
            A subscription is a persistent, real-time connection between the client and the server.
            Unlike traditional API calls, subscriptions automatically push new data whenever something
            changes — without the client asking for it.
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Client opens a long-lasting connection</li>
            <li>Server pushes updates immediately</li>
            <li>No polling, no repeated HTTP requests</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Why Use Socket.io?</h3>
          <p className="mb-4">
            Socket.io is a real-time engine that simplifies WebSockets and adds reliability, fallbacks,
            rooms, namespaces, and event-based communication.
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Easy event-based API</li>
            <li>Auto-reconnect</li>
            <li>Broadcasting to multiple clients</li>
            <li>Great for chat apps, notifications, and dashboards</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Basic Socket.io Server Setup</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  socket.emit('welcome', 'Hello from server!');

  socket.on('message', data => {
    io.emit('message', data); // broadcast
  });
});

server.listen(3000, () => console.log('Server running...'));`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Client-Side Example</h3>
          <pre className="bg-base-200 p-4 rounded-lg mb-4 text-sm">
            {`import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

socket.on('welcome', msg => {
  console.log(msg);
});

socket.on('message', data => {
  console.log('New message:', data);
});

socket.emit('message', 'Hello World!');`}
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">GraphQL Subscriptions vs Socket.io</h3>

          <table className="table w-full mb-4">
            <thead>
              <tr>
                <th>Feature</th>
                <th>GraphQL Subscriptions</th>
                <th>Socket.io</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Protocol</td>
                <td>WebSocket-based (GraphQL spec)</td>
                <td>Custom WebSocket layer</td>
              </tr>
              <tr>
                <td>Use Case</td>
                <td>Structured API real-time data</td>
                <td>General-purpose realtime events</td>
              </tr>
              <tr>
                <td>Ease of Setup</td>
                <td>Medium</td>
                <td>Very Easy</td>
              </tr>
              <tr>
                <td>Best For</td>
                <td>Apps already using GraphQL</td>
                <td>Chat, notifications, dashboards</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-6 mb-2">Common Real-World Use Cases</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Chat & messaging systems</li>
            <li>Live notifications (orders, likes, comments)</li>
            <li>Real-time dashboards & metrics</li>
            <li>Collaboration tools (multi-user editing)</li>
            <li>Online games & presence systems</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Conclusion</h3>
          <p className="mb-4">
            Subscriptions and Socket.io bring instant, real-time interaction to modern apps.
            Whether you’re building a chat app, a live dashboard, or collaborative tools, this technology
            ensures that users receive updates the moment they happen — making the experience more dynamic
            and reactive.
          </p>
        </>




      </motion.div>
    </AnimatePresence>
  );
}
