const person = require("../models/person.js")
const express = require('express')
const path = require('path')

var appRouter = function (app) {
  // app.get("/", function(req, res) {
  //   res.status(200).send("Welcome to our restful API")
  // })

  app.get("/persons", function (req, res) {
    person.getAll(function(err, results){
      if (err) throw err
      res.status(200).send(results)
    })
  })

  app.get('/person/:id', function (req, res) {
    let id = req.params.id

    if (!id) {
      return res.status(400).send({ error: true, message: 'Please provide person id' })
    }else{
      person.getAllById(id, function(err, results){
        if (err) throw err
        res.status(200).send(results[0])
      })}
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
    })
  })

  app.put('/person', function (req, res) {
    let id = req.body.id
    let name = req.body.name
    console.log("id:"+id)
    console.log("name:"+name)

    if (!id || !name) {
      return res.status(400).send({ error: true, message: 'Please provide person id and name' })
    }

    person.update(id, name, function (err, results) {
      if (err) throw err
      return res.send(
        {error: false, data: results, message: 'Person has been updated successfully.'})
    })
  })

  app.delete('/person', function (req, res) {
    let id = req.body.id

    if (!id ){
      return res.status(400).send({ error: true, message: 'Please provide person id' })
    }

    person.delete(id, function (err, results) {
      if (err) throw err
      return res.send(
        {error: false, data: results, message: `Person with id ${id} has been deleted successfully.`})
    })
  })
/*
  app.get('*', (req,res) => {
    let react_path = path.join(__dirname, '../client/build/index.html')
    console.log("path to react: "+react_path)
    res.sendFile(react_path)
  })
  */
}

module.exports = appRouter
