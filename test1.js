var mysql = require('mysql')

var connection = mysql.createConnection({
  host: process.env.IP,
  user: process.env.C9_USER,
  password: '',
  database: 'contacts'
})

// connect to the database
connection.connect(function(err){
  if (err) throw err
  console.log('You are now connected...')
})

//const sql = 'SELECT * FROM Persons'
//const sql = 'SELECT * FROM Phones'
const sql = 'SELECT * FROM Emails'

// read the database
connection.query(sql, function(err, result){
  if (err) throw err
  console.log("Result: " + JSON.stringify(result))
})

connection.query('SELECT * FROM Persons \
  WHERE name = ?', 'Lotty Buzzing', function(err, result){
    if (err) throw err
    console.log("Result: " + JSON.stringify(result))})

// close connection
connection.end()
