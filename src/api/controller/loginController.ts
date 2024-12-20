import { getUserEmail } from "../services/services";
import { Request,Response } from "express";

export class loginController {
    public static async verifyLogin(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, senha } = req.body;
    
            if (!email || !senha) {
                return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
            }
            
            const login = await getUserEmail(email);
            if (!login) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            if(login.senha === senha){
                return res.status(200).json({ message: 'Login efetuado com sucesso.' });
            }
            else{
                return res.status(500).json({ error: 'senha errada.' });
            }
            
        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ error: 'Usuário não encontrado.' });
        }
    } 

}