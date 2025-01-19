import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { username, firstName, lastName, password, householdName } = await req.json();

        if (!username || !password || !firstName || !lastName || !householdName) {
            return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return NextResponse.json({ error: "L'utilisateur existe déjà" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let existingHousehold = await prisma.household.findFirst({
            where: { name: householdName }
        });

        let role;

        if (!existingHousehold) {
            existingHousehold = await prisma.household.create({
                data: { name: householdName }
            });
            role = Role.BANK;
        }

        if(username === "admin") {
            role = Role.ADMIN;
        }

        if(!role) {
            role = Role.MEMBER;
        }

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                password: hashedPassword,
                role,
                household: {
                    connect: { id: existingHousehold.id }
                }
            }
        });

        return NextResponse.json(
            { 
                message: "Utilisateur créé avec succès", 
                userId: newUser.id,
                role: newUser.role,
                householdId: existingHousehold.id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la création de l'utilisateur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}