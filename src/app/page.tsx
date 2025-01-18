"use client"

import { Button, Card } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Bienvenue sur <span className="text-blue-600">Cashome</span>
        </h1>

        <p className="mt-3 text-2xl">
          Gérez vos finances familiales en toute simplicité
        </p>

        <div className="flex mt-6">
          <Link href="/login">
            <Button color="primary" className="mr-4">
              Se connecter
            </Button>
          </Link>
          <Link href="/register">
            <Button color="secondary">
              S'inscrire
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex flex-col">
          {['Transactions', 'Missions', 'Ventes'].map((feature) => (
            <Card key={feature} className="m-2 p-4">
              <h4>{feature}</h4>
              <p>Description de la fonctionnalité {feature}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}