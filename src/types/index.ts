import { Item, Mission, Transaction } from "@prisma/client"

interface DashboardStats {
    assignedMissions: Mission[];
    createdMissions: Mission[];
    listedItems: Item[];
    purchasedItems: Item[];
    balance: number;
    sentTransactions: Transaction[];
    receivedTransactions: Transaction[];
}

export type { DashboardStats }