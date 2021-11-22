const port = process.env.port
const Agendamento = require('./agendamento')

const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')


const cors = corsMiddleware({
  origins: ['http://localhost:8080']
})

const server = restify.createServer()

server.use(restify.plugins.bodyParser())
server.pre(cors.preflight)
server.use(cors.actual)

server.post('/xet', async (req, res) => {
  if ('owner', 'title', 'startTime', 'endTime' in req.body) {
    const agendamento = req.body
    
    Agendamento.create(agendamento)
      .then(data => {
        res.send(200)
      }).catch(err => {
        res.send(500, { message: 'Server Internal Error: ' + JSON.stringify(err) })
      })
  } else {
    res.send(400, { message: 'Missing Body Params' })
  }
})

server.get('/xet/all', async (req, res) => {
    Agendamento.findAll()
      .then(data => {
        console.log(data)
        res.send(data)
      }).catch(err => {
        res.send(500, { message: 'Server Internal Error' + JSON.stringify(err) })
      })
})

server.listen(port, () => { console.log('Server running on ' + port) })

module.exports = server
