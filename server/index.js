const path = require('path')
const next = require('next')
const server = require('express')()
const routes = require('./routes')

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../prod.env') })
}

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: path.resolve(__dirname, '../dev.env') })
}

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {

  server.use(handler)

  server.listen(process.env.PORT, () => console.log(`application running on port ${process.env.PORT}`))
  
})