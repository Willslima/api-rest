import { StatusCodes } from 'http-status-codes'
import { NextFunction, Router, Request, Response } from 'express'
import user_repository from '../repositories/user_repository'

//GET
const usersRoute = Router()
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await user_repository.findAllUsers()
  res.status(StatusCodes.OK).send(users)
})

usersRoute.get(
  '/users/:uuid',
  (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({ uuid })
  }
)

//POST
usersRoute.post(
  '/users',
  (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const newUser = req.body
    console.log(newUser)
    res.status(StatusCodes.CREATED).send(newUser)
  }
)

//PUT
usersRoute.put(
  '/users/:uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const modifiedUser = req.body
    modifiedUser.uuid = uuid
    console.log()
    res.status(StatusCodes.OK).send(modifiedUser)
  }
)

//DELETE
usersRoute.delete(
  '/users/:uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK)
  }
)

export default usersRoute

/* 

GET /USERS
GET /USERS/:UUID
POST /USERS
PUT /USERS/:UUID
DELETE /USERS/:UUID

*/
