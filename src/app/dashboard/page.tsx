"use client";

import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Skeleton } from '@nextui-org/react';
import { DashboardStats } from '@/types/index';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    axios.get('/api/user').then((response) => {
      if(response.status === 200) {
        setIsLoading(false);
        setUserData(response.data.data);
      }else {
        toast.error("Une erreur est survenue lors de la récupération des données");
      }
    });
  }, [])

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton isLoaded={!isLoading} className='rounded-lg'>
            <div className="bg-white text-black shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Solde actuel</h4>
              <p className="text-3xl font-bold">{userData?.balance} €</p>
            </div>
          </Skeleton>
            <Skeleton isLoaded={!isLoading} className='rounded-lg'>
              <div className="bg-white text-black shadow rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">Missions en cours</h4>
                <p className="text-3xl font-bold">{}</p>
              </div>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} className='rounded-lg'>
            <div className="bg-white text-black shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Articles en vente</h4>
              <p className="text-3xl font-bold">5</p>
            </div>
          </Skeleton>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Dernières transactions</h3>
          {/* Liste des transactions ici */}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Missions en cours</h3>
          {/* Liste des missions ici */}
        </div>
      </div>
    </div>
  );
}