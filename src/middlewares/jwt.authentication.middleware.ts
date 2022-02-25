import { NextFunction, Request, Response } from 'express'
import ForbiddenError from '../models/errors/fobbiden.error'
import JWT from 'jsonwebtoken'
import user_repository from '../repositories/user_repository'

async function bearerAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas')
    }

    const [authenticationType, token] = authorizationHeader.split(' ')

    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválida')
    }

    try{
      const tokenPayload = JWT.verify(token, 'my_secret_key')
  
      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token Inválido')
      }
  
      const user = { uuid: tokenPayload.sub, username: tokenPayload.username }

    }catch(error){
      throw new ForbiddenError('Token Inválido')

    }

    req.user = user;
    next()

  } catch (error) {
    next(error)
  }
}

export default bearerAuthenticationMiddleware
