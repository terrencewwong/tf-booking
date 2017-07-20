const Path = require('path')
const Hapi = require('hapi')
const Inert = require('inert')

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'dist')
            }
        }
    },
    debug: { request: ['error'] }
})

server.app.db = {}

server.connection({ port: 3000 })

server.register(Inert, () => {})
server.register(require('vision'), (err) => {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'dist'
  })
})

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: 'index'
  }
})

server.route({
  method: 'GET',
  path: '/poll/{id}',
  handler: {
    view: 'index'
  }
})

server.route({
  method: 'GET',
  path: '/api/polls/{id}',
  handler: function (request, reply) {
    const { id } = request.params
    const { db } = request.server.app

    const response = db[id]
    if (!response) {
      return reply().code(404)
    }

    reply(response)
  }
})

server.route({
  method: 'POST',
  path: '/api/polls/{id}',
  handler: function (request, reply) {
    const { id } = request.params
    const { tfUrl, timeslots} = request.payload
    request.server.app.db[id] = { tfUrl, timeslots }
    reply().code(201)
  }
})

server.route({
  method: 'PUT',
  path: '/api/polls/{id}',
  handler: function (request, reply) {
    const { id } = request.params
    const { participants } = request.payload
    const { db } = request.server.app

    const currentData = db[id]
    if (!currentData) {
      return reply().code(404)
    }

    request.server.app.db[id] = Object.assign({}, currentData, {
      participants
    })

    reply(request.server.app.db[id]).code(200)
  }
})

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
})

server.start((err) => {

    if (err) {
        throw err
    }

    console.log('Server running at:', server.info.uri)
})
