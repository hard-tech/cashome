"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Déconnexion réussie");
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Une erreur est survenue lors de la déconnexion");
    }
  };

  return (
    <Button color="danger" className="mt-2" onPress={handleLogout}>
      Déconnexion
    </Button>
  );
}