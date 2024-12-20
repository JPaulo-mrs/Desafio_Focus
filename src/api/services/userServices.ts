import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import { Exception } from "../exception/exception";
import { NotFoundException } from "../exception/notFoundException";
import { getUserEmail } from "../services/services";
import { UserCreate } from "../models/interface/userCreate";


export const changePassword = async(email:string, senha: string):Promise<User> =>{
    const prisma = new PrismaClient();
    await getUserEmail(email);

    if(!email || !senha){
        throw new Exception('senha não informada', 404);
    }

    const updateFuncionario = await prisma.user.update({
       where:{
              email: email
       },
        data:{
            senha: senha
        }
    })
    return updateFuncionario;
}

export const createUser = async(body: UserCreate):Promise<User> => {
    const prisma = new PrismaClient();
    console.log(body);
    try {
        const funcionario = await prisma.user.create({
            data: {
                email: body.email,
                senha: body.senha
            }
        });

        if (!funcionario) {
            throw new Error("Erro ao criar o funcionário");
        }

        return funcionario;
    } catch (error) {
        console.error("Erro ao criar o funcionário", error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("PrismaClient disconnected");
    }
}