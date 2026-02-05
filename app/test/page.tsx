"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JavaScriptAdvancedLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Maîtrisez JavaScript en profondeur
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground"
          >
            Un cours JavaScript avancé en français pour comprendre comment le
            langage fonctionne réellement sous le capot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button size="lg">Commencer le cours</Button>
            <Button size="lg" variant="outline">
              Voir le programme
            </Button>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-semibold text-center">
            Le problème avec la plupart des tutoriels JavaScript
          </h2>
          <p className="mt-6 text-center text-muted-foreground">
            Beaucoup de développeurs utilisent JavaScript sans vraiment
            comprendre ses mécanismes internes.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              "L’Event Loop reste flou",
              "Les closures semblent magiques",
              "Le comportement de this est imprévisible",
              "L’asynchrone provoque des bugs difficiles",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6 text-center">
                  <p>{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-semibold">La solution</h2>
          <p className="mt-6 text-muted-foreground">
            Un cours pensé pour expliquer le *pourquoi*, pas seulement le
            *comment*.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "Comprendre le moteur JavaScript",
              "Maîtriser OOP et Programmation Fonctionnelle",
              "Écrire un code asynchrone fiable",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <p className="font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT OVERVIEW */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-semibold text-center">
            Ce que vous allez apprendre
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Fonctionnement interne de JavaScript",
              "Closures & héritage prototypal",
              "OOP vs FP",
              "Event Loop & async/await",
              "Modules et architecture moderne",
              "Bonnes pratiques professionnelles",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <p>{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Prêt à vraiment maîtriser JavaScript ?
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Arrêtez d’écrire du code qui fonctionne par hasard. Commencez à
            écrire du code que vous comprenez.
          </p>
          <div className="mt-10">
            <Button size="lg">Accéder au cours</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
