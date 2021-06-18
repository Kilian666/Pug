const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'heroes'
})

connection.connect()

app.get('/', function (req, res) {


  connection.query('select * from heroes', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0])
    res.render('index', { rows: rows })
  })

})

app.get('/delete/:id', function (req, res) {


  connection.query('DELETE FROM heroes WHERE id=' + req.params.id, function (err, rows, fields) {
    if (err) throw err
    res.redirect('/')

  })

})

app.post('/add', function (req, res) {

  console.log(req.body)
  connection.query(`INSERT into heroes (name) values('${req.body.name}')`, function (err, rows, fields) {
    if (err) throw err
    res.redirect('/')

  })
})

app.get('/edit/:id', function (req, res,) {

  connection.query(`select name from heroes where id = ${req.params.id}`, function (err, row) {

    if (err) throw err
    console.log(row)
    res.render('update', { id: req.params.id, row: row })
  })


})


app.post('/update/:id', function (req, res) {
  connection.query(`update heroes set name= '${req.body.name}' where id=${req.params.id}`, function (err, rows, fields) {
    if (err) throw err
    res.redirect('/')

  })

})


app.listen(3000, () => { console.log("Server started already") });