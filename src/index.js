import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app)
const port = process.env.PORT || 5000

app.get('/', (request, response) => {
  response.send('hello world')
})

server.listen(port, () =>  console.log(`Server listening at port ${port}`))
