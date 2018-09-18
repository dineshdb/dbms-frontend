const express = require('express')
const httpProxy = require('http-proxy')
const path = require('path')

const apiServer = 'http://localhost:8080'

const app = express()
const apiProxy = httpProxy.createProxyServer()

const publicFolder = 'build'

app.use(express.static(publicFolder))

app.all("/api/*", (req, res) => {
      req.url = req.url.replace("/api/", "/")
//      console.log("Redirecting to api", req)
      apiProxy.web(req, res, { target: apiServer})
})

app.use(function (req, res, next) {
  res.status(200).sendFile(path.join(__dirname, publicFolder, 'index.html'))
})

app.listen(3000, ()=>{
  console.log("http://localhost:3000/")
})
