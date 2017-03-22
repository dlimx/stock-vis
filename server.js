require('babel-register')
 
const express = require('express')
const compression = require('compression')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router-dom')
const StaticRouter = ReactRouter.StaticRouter
const _ = require('lodash')
const fs = require('fs')
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)

// entry point
const AppClient = require('./src/Routes').default

const server = express()

server.use(compression())
server.use('/public', express.static('./public', {maxage: 1210000000}))

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
const port = process.env.PORT || 5050

console.log('Server hosted on port ' + port)
server.listen(port)
