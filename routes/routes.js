var person = require("../models/person.js")

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API")
  })

  app.get("/persons", function (req, res) {
    person.getAll(function(err, rows){
      if (err) throw err
      res.status(200).send(rows)
    })
  })
}

module.exports = appRouter
