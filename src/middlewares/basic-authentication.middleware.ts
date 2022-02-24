import { NextFunction, Request, Response } from 'express'
import ForbiddenError from '../models/errors/fobbiden.error';
import user_repository from '../repositories/user_repository';

async function basicAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try{
        const authorizationHeader = req.headers['authorization']
    
        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválida')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':');

        console.log(username, password);

        if(!username || !password){
            throw new ForbiddenError('Credenciais não informadas')
        }
        
        const user = await user_repository.findByUsernameAndPassword(username, password);

        if(!user){
            throw new ForbiddenError('Usuário ou senha inválidos')
        }

        req.user = user
        next();
    }catch(error){
        next(error)
    }
}

export default basicAuthenticationMiddleware
