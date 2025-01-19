"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Stats from "@/components/dashboard/Stats";
import { DashboardStats } from "@/types";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    axios.get("/api/user").then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
        setUserData(response.data.data);
      } else {
        toast.error(
          "Une erreur est survenue lors de la récupération des données"
        );
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

        {/* Statistiques */}
        <Stats userData={userData} isLoading={isLoading} />

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Dernières transactions</h3>
          {/* Liste des transactions ici */}
          {
            userData?.sentTransactions.map((transaction) => 
              <div key={transaction.id} className="flex justify-between items-center bg-white shadow rounded-lg p-4 mb-2">
                <div>
                  <p className="text-lg font-semibold">{transaction.amount}</p>
                  <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
                <p className={"text-lg font-semibold " + (transaction.amount < 0 ? "text-red-500" : "text-green-500")}>
                  <span>{transaction.amount < 0 && "-"}</span> {transaction.amount.toPrecision(3)} €
                </p>
              </div>
            )
          }
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Missions en cours</h3>
          {/* Liste des missions ici */}
        </div>
      </div>
    </div>
  );
}
