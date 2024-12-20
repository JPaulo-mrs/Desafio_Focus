import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import { Exception } from "../exception/exception";
import { NotFoundException } from "../exception/notFoundException";

export const getUserEmail= async(email: string):Promise<User> =>{
    const prisma = new PrismaClient();
    try {
        if (!email) {
            throw new Exception('email não informado', 404);
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (!user) {
            throw new NotFoundException('user');
        }
        return user;
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}