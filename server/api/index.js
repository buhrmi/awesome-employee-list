const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const router = express.Router()

const db = new sqlite3.Database('db.sqlite')

db.run('CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY ASC, name STRING, address STRING, phone STRING, job STRING, salary INTEGER)')

router.get('/employees', (req, res) => {
  console.log(req.query)
  if (req.query.name) {
    db.all("SELECT * FROM employees WHERE name like ?", '%' + req.query.name + '%', (err, rows) => {
      res.json({
        employees: rows
      })
    })
  }
  else {
    db.all('SELECT * FROM employees', (err, rows) => {
      res.json({
        employees: rows
      })
    })
  }
})

router.get('/employees/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', req.params.id, (err, row) => {
    res.json({
     employee: row
    })
  })
})

router.put('/employees/:id', (req, res) => {
  db.run('UPDATE employees SET name=?, address=?, phone=?, job=?, salary=? WHERE id = ?', req.body.name, req.body.address, req.body.phone, req.body.job, req.body.salary, req.params.id, (err) => {
    res.json({error: err})
  })
})

router.delete('/employees/:id', (req, res) => {
  db.run('DELETE FROM employees where id = ?', req.params.id, (err) => {
    res.json({error: err})
  })
})

router.post('/employees', (req, res) => {
  db.run('INSERT INTO employees (name, address, phone, job, salary) VALUES(?,?,?,?,?)', req.body.name, req.body.address, req.body.phone, req.body.job, req.body.salary, (err) => {
    res.json({error: err})
  })
})

module.exports = router;
