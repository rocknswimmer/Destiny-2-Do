const express = require('express');
const app = express();
const compression = require('compression')
const path = require('path');
require('dotenv').config()

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/missions/:id', (req, res) => {
  const user = req.params.id;
  pool.query('select * from missions where user_id = $1 and category = $2', [user, 'other'], (err, data) => {
    if(err) {
      console.log('error retrieving missions')
    }
    res.send(data)
  })
})

app.post('/newMission/:id', (req, res) => {
  const user = req.params.id;
  const {mission, category} = req.body;
  // console.log( mission, category, user, 'data before this string')
  // res.send("testing")
  pool.query('insert into missions (mission, category, user_id) values ($1, $2, $3)', [mission, category, user], (err, data) => {
    if(err) {
      console.log('error creating mission', err)
    }
    res.send('mission created')
  })
})



app.listen(3009);
console.log('Listening on port 3009');
