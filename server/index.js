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
  pool.query("select category, COALESCE(json_agg(row_to_json(missions)), '[]'::json) toDos from missions where user_id = $1 and complete = false group by category", [user], (err, data) => {
    if(err) {
      console.log('error retrieving missions')
    }
    res.send(data)
  })
})

app.get('/archive/:id', (req, res) => {
  const user = req.params.id;
  pool.query("select * from missions where user_id = $1 and complete = true", [user], (err, data) => {
    if(err) {
      console.log('error retrieving archived missions')
    }
    res.send(data)
  })
})

app.post('/newMission/:id/', (req, res) => {
  const user = req.params.id;
  const {mission, category} = req.body;
  // console.log( mission, category, user, 'data before this string')
  // res.send("testing")
  pool.query('insert into missions (mission, category, user_id) values ($1, $2, $3)', [mission, category, user], (err, data) => {
    if(err) {
      console.log('error creating mission')
    }
    res.send('mission created')
  })
})

app.put('/complete/:id', (req, res) => {
  const mission = req.params.id;
  pool.query('update missions set complete = true where id = $1', [mission], (err, data) => {
    if(err) {
      console.log('error marking mission complete')
    }
    res.send('Mission Complete!')
  })
})

app.put('/unarchive/:id', (req, res) => {
  const mission = req.params.id;
  pool.query('update missions set complete = false where id = $1', [mission], (err, data) => {
    if(err) {
      console.log('error unarchiving mission')
    }
    res.send('Mission Unarchived')
  })
})

app.put('/note/:id', (req, res) => {
  const mission = req.params.id;
  const {note} = req.body;
  // console.log('testing', note)
  // res.send('testing put')
  pool.query('update missions set note = $1 where id = $2', [note, mission], (err, data) => {
    if(err) {
      console.log('error updating mission note')
    }
    res.send('Mission note updated')
  })
})

app.put('/weeklyReset/:id', (req, res) => {
  const user = req.params.id

  pool.query('update missions set complete = false where user_id = $1 and category = $2', [user, 'weekly'], (err, data) => {
    if(err){
      console.log('error performing weekly reset')
    }
    res.send('Weekly Missions Reset')
  })
})

app.listen(3009);
console.log('Listening on port 3009');
