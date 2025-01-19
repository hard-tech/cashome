import { Item, Mission, Transaction } from "@prisma/client"

interface DashboardStats {
    missions: Mission
    items: Item
    balance: number
    transactions: Transaction
}

export type { DashboardStats }