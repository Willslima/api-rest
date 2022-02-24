import express from 'express'
import basicAuthenticationMiddleware from './middlewares/basic-authentication.middleware'
import errorHandler from './middlewares/error.handler.middleware'
import authorizationRoute from './routes/authorization.route'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

const app = express()

//Configurações da aplicação para entender/ler o json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuração de rotas

app.use(usersRoute)
app.use(statusRoute)
app.use(authorizationRoute)

//Configuração do handler de error
app.use(errorHandler)

//Inicializar o servidor
app.listen(3000, () => {
  console.log(`Servidor ON: http://localhost:3000/`)
})
