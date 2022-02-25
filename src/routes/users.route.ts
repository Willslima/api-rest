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
  '/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid
      const user = await user_repository.findById(uuid)
      res.status(StatusCodes.OK).send(user)

     } catch(error){
       next(error)
    }
  }
)

//POST
usersRoute.post(
  '/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const uuid = await user_repository.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
  }
)

//PUT
usersRoute.put(
  '/users/:uuid',
   async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const modifiedUser = req.body
    modifiedUser.uuid = uuid

    await user_repository.update(modifiedUser)
    res.status(StatusCodes.OK).send()
  }
)

//DELETE
usersRoute.delete(
  '/users/:uuid',
   async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    await user_repository.remove(uuid)
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
