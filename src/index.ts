import express from 'express'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

const app = express()

//Configurações da aplicação para entender/ler o json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuração de rotas
app.use(usersRoute)

app.use(statusRoute)

//Inicializar o servidor
app.listen(3000, () => {
  console.log(`Servidor ON: localhost:3000/`)
})
