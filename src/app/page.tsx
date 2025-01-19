"use client";

import LogoutButton from "@/components/LogoutButton";
import { Button, Card, Spacer } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();

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
          {session.data ? (
            <div className="flex flex-col items-center">
              <p>Connecté en tant que {session.data?.user.firstName} {session.data?.user.lastName} ({session.data?.user.username})</p>
              <div className="flex">
                <Link href="/dashboard">
                  <Button color="primary" className="mt-2 text-white">
                    Accéder au tableau de bord
                  </Button>
                </Link>
                <Spacer y={1} />
                <LogoutButton />
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button color="primary" className="mr-2 text-white">
                  Se connecter
                </Button>
              </Link>
              <Link href="/register">
                <Button color="secondary" className="text-white">
                  S'inscrire
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col">
          {["Transactions", "Missions", "Ventes"].map((feature) => (
            <Card key={feature} className="m-2 p-4 text-white">
              <h4>{feature}</h4>
              <p>Description de la fonctionnalité {feature}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
