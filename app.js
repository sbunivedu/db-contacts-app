var express = require("express")
var bodyParser = require("body-parser")
var routes = require("./routes/routes.js")
var app = express()

var db = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if(err){
    console.log('Unable to connect to MySQL.')
  }else{
    console.log('Connected to MySQL.')
  }
})

var server = app.listen(8080, function () {
  console.log("app running on port.", server.address().port)
})
