import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const session = await getToken(
        { req, secret: process.env.SECRET }
    );
    const userid =  session?.sub;

    try {
        const user = await prisma.user.findUnique({
            where: { 
                id: Number(userid) 
            },
            select: {
                missions: true,
                items: true,
                balance: true,
                transactions: true,
            }
        });

        return NextResponse.json(
            { data: {
                missions: user?.missions,
                items: user?.items,
                balance: user?.balance,
                transactions: user?.transactions
                // currentMission: user?.missions.filter((mission) => mission.status === 'en cours').length,
            } },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la récupération des données" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}