const express = require('express')
const httpProxy = require('http-proxy')
const path = require('path')

const apiServer = 'http://localhost:8080'
const developmentReactServer = 'http://localhost:3000'

const app = express()
const apiProxy = httpProxy.createProxyServer()

const publicFolder = 'build'

app.use(express.static(publicFolder))

app.all("/api/*", (req, res) => {
      req.url = req.url.replace("/api/", "/")
//      console.log("Redirecting to api", req)
      apiProxy.web(req, res, { target: apiServer})
})

// Remove following code block in production.
app.all('*', (req, res) => {
      apiProxy.web(req, res, { target: developmentReactServer})

})

app.use(function (req, res, next) {
  res.status(200).sendFile(path.join(__dirname, publicFolder, 'index.html'))
})

app.listen(3001, ()=>{
  console.log("http://localhost:3001/")
})
