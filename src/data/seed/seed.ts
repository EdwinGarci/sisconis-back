import { PrismaClient } from "@prisma/client";
import { seedData } from "./data";

const prisma = new PrismaClient();

// Funcion anonima asyncrona autoinvocada
(async()=> {
    await main();
    await prisma.$disconnect();
})();

const randoMBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x);
}

async function main() {
    // Borrar todo
    await prisma.user.deleteMany();
    await prisma.logModel.deleteMany();

    // Insertar usuarios
    await prisma.user.createMany({ data: seedData.users });
    console.log('SEEDED');
}