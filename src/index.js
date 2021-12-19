const logger = require('./logger')
const restify = require('restify')
const server = restify.createServer()
const corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
  origins: ['http://localhost:8080']
})
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

const Scheduling = require('./scheduling')
const Message = require('./message')

const APIErrors = {
  general: (err={}) => { message: 'Error: ' + JSON.stringify(err) },
  missingBodyParams: (err={}) => { message: 'Error: ' + JSON.stringify(err) }
}

server.post('/xet', async (req, res) => {
  const scheduling = req.body
  logger.debug(`/xet ${scheduling}`)
  if ('owner', 'title', 'startTime', 'endTime' in scheduling) {
    Scheduling.create(scheduling)
      .then(() => {
        logger.debug(`/xet ${scheduling} created`)
        res.send(200)
      }).catch(err => {
        logger.error(`/xet ${scheduling} ${err.message}`)
        res.send(500, APIErrors.general + err.message)
      })
  } else {
    res.send(400, APIErrors.missingBodyParams())
  }
})

server.get('/xet/all', async (req, res) => {
  logger.debug(`/xet/all`)
  Scheduling.findAll()
    .then(xets => {
      logger.debug(`/xet/all return ${xets}`)
      res.send(200, xets)
    }).catch(err => {
      logger.error(`/xet/all ${err.message}`)
      res.send(500, APIErrors.general(err.message))
    })
})

server.get('/xet/:id/message/all', async (req, res) => {
  logger.debug(`/xet/:id/message/all`)
  Message.findAll({ where: { xetId: req.params.id }})
    .then((messages) => {
      logger.debug(`/xet/:id/message/all return ${messages}`)
      res.send(200, messages)
    }).catch(err => {
      logger.error(`/xet/:id/message/all ${err.message}`)
      res.send(500, { message: APIErrors.general(err.message) })
    })
})
 
server.post('/xet/:id/message', async (req, res) => {
  logger.debug(`/xet/:id/message`)
  const message = req.body
  message.xetId = req.params.id
  Message.create(message)
    .then(() => {
      logger.debug(`/xet/:id/message ${message} created`)
      res.send(200)
    }).catch(err => {
      logger.error(`/xet/:id/message message body: ${JSON.stringify(message)} ${err.message}`)
      res.send(500, APIErrors.general(err))
    })
})

server.listen(process.env.port, () => { logger.info(`xet-backend server running on ${process.env.port}`) })

module.exports = server