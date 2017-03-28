require('babel-register')
 
const express = require('express')
const compression = require('compression')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router-dom')
const StaticRouter = ReactRouter.StaticRouter
const _ = require('lodash')
const favicon = require('serve-favicon')
const path = require('path')
const fs = require('fs')
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)

require('dotenv').config()
require('./api/db');

// entry point
const AppClient = require('./src/Routes').default
const apiRoutes = require('./api/apiRoutes')

const server = express()

server.use(compression())
server.use(favicon(path.join(__dirname, 'public', 'favicon', 'favicon.ico')))
server.use('/', express.static(path.join(__dirname, 'public'), {maxage: 1210000000}))

server.use('/api', apiRoutes)

// server side rendering
server.use((req, res) => {
  const context = {}
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, {location: req.url, context: context},
      React.createElement(AppClient)
    )
  )
  res.write(template({body: body}))
  res.end()
})

// server port and setup
const port = process.env.PORT || 8080

console.log('Server hosted on port ' + port)
server.listen(port)
