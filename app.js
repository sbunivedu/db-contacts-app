var express = require("express")
var bodyParser = require("body-parser")
var routes = require("./routes/routes.js")
var app = express()
const path = require('path')

var db = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, './client/build/')));

routes(app)

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if(err){
    console.log('Unable to connect to MySQL.')
  }else{
    console.log('Connected to MySQL.')
  }
})

var server = app.listen(process.env.PORT, function () {
  console.log("app running on port.", server.address().port)
})
