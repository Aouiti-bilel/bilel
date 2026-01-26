"use client";

import Link from "next/link";
import { Bell, MessageSquare, PenSquare, UserCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { theme, setTheme } = useTheme();
    const [profileOpen, setProfileOpen] = useState(false);
    const [messagesCount, setMessagesCount] = useState(0);
    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {

        // Fetch real counters
        async function loadCounters() {
            try {
                const res = await fetch("/api/admin/counters");
                if (!res.ok) return;
                const data = await res.json();
                setMessagesCount(data.messages);
                setNotificationsCount(data.notifications);
            } catch (e) {
                console.error(e);
            }
        }

        loadCounters();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                            B
                        </div>
                        <span className="font-semibold tracking-tight">Admin</span>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Blog */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/admin/blog">
                                <Button variant="ghost" size="icon" className="rounded-xl">
                                    <PenSquare className="h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Messages */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="relative">
                            <Link href="/admin/messages">
                                <Button variant="ghost" size="icon" className="rounded-xl">
                                    <MessageSquare className="h-5 w-5" />
                                </Button>
                            </Link>
                            {messagesCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center px-1">
                                    {messagesCount}
                                </span>
                            )}
                        </motion.div>

                        {/* Notifications */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="relative">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <Bell className="h-5 w-5" />
                            </Button>
                            {notificationsCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center px-1">
                                    {notificationsCount}
                                </span>
                            )}
                        </motion.div>

                        {/* Theme toggle */}
                            <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {theme === "dark" ? (
                                            <motion.div
                                                key="sun"
                                                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <Sun className="h-5 w-5" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="moon"
                                                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <Moon className="h-5 w-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>

                        {/* Profile */}
                        <div className="relative">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl"
                                    onClick={() => setProfileOpen((v) => !v)}
                                >
                                    <UserCircle className="h-7 w-7" />
                                </Button>
                            </motion.div>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute right-0 mt-2 w-52 rounded-2xl border bg-background shadow-xl"
                                    >
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-medium">Bilel Laouiti</p>
                                            <p className="text-xs text-muted-foreground">Administrator</p>
                                        </div>
                                        <div className="py-1">
                                            <Link href="/admin/profile" className="block px-4 py-2 text-sm hover:bg-muted">Profile</Link>
                                            <Link href="/admin/settings" className="block px-4 py-2 text-sm hover:bg-muted">Settings</Link>
                                        </div>
                                        <div className="border-t">
                                            <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted">Logout</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1 mx-auto w-full max-w-7xl p-6">{children}</main>
        </div>
    );
}
