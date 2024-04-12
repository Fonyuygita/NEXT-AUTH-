import {PrismaClient} from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined;
}

// Doing this because of next.js hot reload : when ever we save a file, next.js will run a hot reload, and that will initialize a new prisma client every time and will we get some warnings in our terminal, that you have too many active prisma client, and in that case we use globalThis, since not affected by hot reload

export const db=globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma=db;