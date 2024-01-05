import type { PrismaClient, User } from '@prisma/client';

declare global {
    namespace App {
        interface Locals {
            user?: User;
            db: PrismaClient;
        }
    }
}

export {};