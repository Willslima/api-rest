import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/fobbiden.error";
import user_repository from "../repositories/user_repository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token',basicAuthenticationMiddleware,  async(req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.user;

        if(!user){
            throw new ForbiddenError('Usuário não informado!')
        }
        const jwtPayload = {username: user.username}
        const jwtOption = {
            subject: user?.uuid
        }
        const secretKey = 'my_secret_key'

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOption)

        res.status(StatusCodes.OK).json({token: jwt})

    } catch(error){
        next(error)
    }
})

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, resp: Response, next: NextFunction) => {
    resp.sendStatus(StatusCodes.OK)
})

export default authorizationRoute;