"use client";

import { Button, Card, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Connexion</h2>
          <form>
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              type="email"
            />
            <Spacer y={1} />
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Mot de passe"
              type="password"
            />
            <Spacer y={1} />
            <Button color="primary">
              Se connecter
            </Button>
          </form>
          <Spacer y={1} />
          <Link href="/register">
            <p className="text-sm text-blue-600">Pas encore de compte ? S'inscrire</p>
          </Link>
        </Card>
      </div>
    </main>
  );
}
