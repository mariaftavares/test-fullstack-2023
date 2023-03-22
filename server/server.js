const app = require('./src/app')
const PORT = 5050

app.listen(PORT, () => {
  try {
    console.log(`Servidor Rodando na porta ${PORT}`)
  } catch (error) {
    console.log(error.message)
  }
})