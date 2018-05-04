var express = require("express")
var bodyParser = require("body-parser")
var routes = require("./routes/routes.js")
var app = express()

var db = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

var server = app.listen(8080, function () {
  console.log("app running on port.", server.address().port)
})

db.connect(db.MODE_PRODUCTION, function() {
  console.log('Connected to production database.')
})
