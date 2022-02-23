import express from 'express'
import errorHandler from './middlewares/error.handler.middleware'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

const app = express()

//Configurações da aplicação para entender/ler o json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuração de rotas
app.use(usersRoute)
app.use(statusRoute)

//Configuração do handler de error
app.use(errorHandler)

//Inicializar o servidor
app.listen(3000, () => {
  console.log(`Servidor ON: http://localhost:3000/`)
})
