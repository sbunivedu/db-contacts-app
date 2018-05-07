var data = {
  tables: {
    Persons: [
      {"id": 1, "name": "Zebulon Joly"},
      {"id": 2, "name": "Betty Anlay"},
      {"id": 3, "name": "Georgia Prandy"}
    ],
    Phones: [
      {"id": 1, "person_id": 2, "number": "494-373-8856", "label": "cell"},
      {"id": 2, "person_id": 1, "number": "325-928-7415", "label": "home"},
      {"id": 3, "person_id": 3, "number": "536-799-1942", "label": "cell"},
      {"id": 4, "person_id": 2, "number": "634-670-3164", "label": "personal"},
    ],
    Emails: [
      {"id": 1, "person_id": 2, "address": "tyurchenko0@macromedia.com", "label": "personal"},
      {"id": 2, "person_id": 1, "address": "ndaber1@wix.com", "label": "work"},
      {"id": 3, "person_id": 3, "address": "oalmond2@fda.gov", "label": "home"},
      {"id": 4, "person_id": 1, "address": "emorfett3@printfriendly.com", "label": "work"},
    ],
  },
}

var db = require('./db')
//db.connect(db.MODE_PRODUCTION, function() {
db.connect(db.MODE_TEST, function() {
  db.drop(['Persons', 'Phones', 'Emails'], function(){})
  db.fixtures(data, function(err) {
    if (err) return console.log(err)
    console.log('Data has been loaded...')
  })
})

// test
const sql = 'SELECT * FROM Emails'
db.get().query(sql, function(err, result) {
  if (err) throw err
  console.log("+++++++++++++++++++")
  console.log("Result: " + JSON.stringify(result))})
