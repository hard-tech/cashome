import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.SECRET });       

        if (!token || !token.sub) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const userid = typeof token.sub === 'string' ? parseInt(token.sub, 10) : null;
        if (userid === null) {
            return NextResponse.json(
                { error: "Invalid user ID" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { 
                id: Number(userid) 
            },
            select: {
                assignedMissions: true,
                createdMissions: true,
                listedItems: true,
                purchasedItems: true,
                balance: true,
                sentTransactions: true,
                receivedTransactions: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { data: user },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in GET /api/user:", error);

        return NextResponse.json(
            { error: "Une erreur est survenue lors de la récupération des données" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}