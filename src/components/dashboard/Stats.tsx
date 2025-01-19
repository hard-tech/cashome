import React, { useState } from "react";
import { ItemStatus, MissionStatus, User } from "@prisma/client";
import { Skeleton } from "@nextui-org/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { DashboardStats } from "@/types/index";


export default function Stats({userData, isLoading}: {userData: DashboardStats | null, isLoading: boolean}) {

    const [openSections, setOpenSections] = useState({
        assignedMissions: false,
        createdMissions: false,
        listedItems: false,
      });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
      };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Solde actuel */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Solde actuel</h4>
              <p className={"text-3xl font-bold " + (Number(userData?.balance) < 0 ? "text-red-500" : "text-green-500")}>
                <span> {Number(userData?.balance) < 0 && "-"} </span> {Number(userData?.balance).toPrecision(3)} €
              </p>
            </div>
          </Skeleton>

          {/* Missions assignées */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">Missions assignées</h4>
                <button onClick={() => toggleSection('assignedMissions')} className="text-gray-500 hover:text-gray-700">
                  {openSections.assignedMissions ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </button>
              </div>
              {!openSections.assignedMissions ? (
                <p className="text-3xl font-bold">{userData?.assignedMissions.length}</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.assignedMissions.filter((item) => item.status === MissionStatus.OPEN).length}
                    <span className="text-2xl text-success">Ouverte</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.assignedMissions.filter((item) => item.status === MissionStatus.COMPLETED).length}
                    <span className="text-2xl text-indigo-500">Complétée</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.assignedMissions.filter((item) => item.status === MissionStatus.ASSIGNED).length} 
                    <span className="text-2xl text-warning">Assignée</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.assignedMissions.filter((item) => item.status === MissionStatus.CANCELLED).length}
                    <span className="text-2xl text-danger">Annulée</span>
                  </p>
                </div>
              )}
            </div>
          </Skeleton>

          {/* Missions créées */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">Missions créées</h4>
                <button onClick={() => toggleSection('createdMissions')} className="text-gray-500 hover:text-gray-700">
                  {openSections.createdMissions ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </button>
              </div>
              {!openSections.createdMissions ? (
                <p className="text-3xl font-bold">{userData?.createdMissions.length}</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.createdMissions.filter((item) => item.status === MissionStatus.OPEN).length}
                    <span className="text-2xl text-success">Ouverte</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.createdMissions.filter((item) => item.status === MissionStatus.COMPLETED).length}
                    <span className="text-2xl text-indigo-500">Complétée</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.createdMissions.filter((item) => item.status === MissionStatus.ASSIGNED).length} 
                    <span className="text-2xl text-warning">Assignée</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.createdMissions.filter((item) => item.status === MissionStatus.CANCELLED).length}
                    <span className="text-2xl text-danger">Annulée</span>
                  </p>
                </div>
              )}
            </div>
          </Skeleton>

          {/* Articles en vente */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">Articles en vente</h4>
                <button onClick={() => toggleSection('listedItems')} className="text-gray-500 hover:text-gray-700">
                  {openSections.listedItems ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </button>
              </div>
              {!openSections.listedItems ? (
                <p className="text-3xl font-bold">{userData?.listedItems.length}</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.listedItems.filter((item) => item.status === ItemStatus.AVAILABLE).length}
                    <span className="text-2xl text-indigo-500">Disponible</span>
                  </p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    {userData?.listedItems.filter((item) => item.status === ItemStatus.SOLD_OUT).length}
                    <span className="text-2xl text-success">Vendu</span>
                  </p>
                </div>
              )}
            </div>
          </Skeleton>

          {/* Articles achetés */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">
                Articles achetés
              </h4>
              <p className="text-3xl font-bold flex items-center gap-2">
                {userData?.purchasedItems.length}
              </p>
            </div>
          </Skeleton>

          {/* Transactions effectuées */}
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div className="bg-white text-black shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">
                Transactions effectuées
              </h4>
              <p className="text-3xl font-bold">
                {userData?.sentTransactions.length}
              </p>
            </div>
          </Skeleton>
        </div>
  );
}