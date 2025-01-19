"use client";

import { Card, Spacer } from "@nextui-org/react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Connexion</h2>
          <LoginForm />
          <Spacer y={10} />
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