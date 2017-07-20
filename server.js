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
    }
})
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
