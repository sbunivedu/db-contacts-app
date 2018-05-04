var db = require('../db.js')

exports.create = function(name, done) {
  db.get().query('INSERT INTO Persons (name) VALUES(?)', name, function(err, result) {
    if (err) return done(err)
    done(null, result.id)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM Persons', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllById = function(id, done) {
  db.get().query('SELECT * FROM Persons WHERE id = ?', id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
