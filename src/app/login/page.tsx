"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Inscription</h2>
          <form>
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Nom"
            />
            <Spacer y={0.5} />
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Prénom"
            />
            <Spacer y={0.5} />
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              type="email"
            />
            <Spacer y={0.5} />
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Mot de passe"
              type="password"
            />
            <Spacer y={0.5} />
            <Input
              fullWidth
              color="primary"
              size="lg"
              placeholder="Confirmer le mot de passe"
              type="password"
            />
            <Spacer y={1} />
            <Button color="primary">
              S'inscrire
            </Button>
          </form>
          <Spacer y={1} />
          <Link href="/register">
            <p className="text-sm text-blue-600">
              Vous n'avez pas de compte? S'inscrire
            </p>
          </Link>
        </Card>
      </div>
    </main>
  );
}