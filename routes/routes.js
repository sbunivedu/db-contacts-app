var person = require("../models/person.js")

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API")
  })

  app.get("/persons", function (req, res) {
    person.getAll(function(err, results){
      if (err) throw err
      res.status(200).send(results)
    })
  })

  app.post('/person', function (req, res) {
    let name = req.body.name

    if (!name) {
      return res.status(400).send(
        {error:true, message: "Please provide the person's name"})
    }

    person.create(name, function (err, results) {
      if (err) throw err
      return res.send(
        {error: false, data: results, message: 'New person has been created successfully.'})
    })})
}

module.exports = appRouter
