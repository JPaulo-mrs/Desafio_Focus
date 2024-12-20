import { Exception } from "./exception";

export class NotFoundException extends Exception{
    constructor(user: string){
        super('${user} não encontrado', 404);
    }
}