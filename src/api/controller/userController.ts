import { Request, Response } from "express";
import { changePassword, createUser } from "../services/userServices";
import { UserCreate } from "../models/interface/userCreate";
import '../services/translationYup';
import * as yup from 'yup';
import { getUserEmail } from "../services/services";

const bodyValidation: yup.Schema<UserCreate> = yup.object().shape({
    id: yup.string().notRequired(),
    email: yup.string().required(),
    senha: yup.string().required().min(6).max(20),
});

export class userController{

    public static async changePassword(req: Request, res: Response):Promise<Response>{
        const { user, newPassword } = req.body;
        if (!user || !newPassword) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }
        try {
            const userEmail = await getUserEmail(req.body.user);
            if(userEmail){
                changePassword(userEmail.email, newPassword)
                return res.status(200).json({ message: "Senha alterada com sucesso!"});
            }
            return res.status(500).json({ error: "Email não cadastrado." });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Email não cadastrado." });
        }
    }

    public static async createUser(req: Request, res: Response):Promise<Response>{
        try{
            let validatedUser: UserCreate | undefined;
            try{
                validatedUser = await bodyValidation.validate(req.body, {abortEarly: false});
            }catch(error){
                const yupError = error as yup.ValidationError;
                const validationErrors: Record<string, string> = {};

                if (yupError.inner && Array.isArray(yupError.inner)) {
                    yupError.inner.forEach((error) => {
                        if (!error.path) return;
                        validationErrors[error.path] = error.message;
                    });
                } else {
                    validationErrors.general = yupError.message || "Erro desconhecido.";
                }
                return res.status(400).json({
                    errors: validationErrors,
                });
            }
            const user = await createUser(validatedUser);
        
            if(!user){
                return res.status(404).json({error: 'Erro ao cadastrar.'});
            }

            return res.status(200).json({
            message: 'Cadastro realizado com sucesso.',
            user,
            });

        }catch(error){
            return res.status(400).json({ error: 'Email já está sendo utilizado.' });
        }
    }
}