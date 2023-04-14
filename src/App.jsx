import React, {useState, useEffect} from 'react';
import Feed from './Feed.jsx';
import Accordion from './Accordion.js'
import axios from 'axios'

function App() {
  const tempToDos = [
    {task: 'get exotic', complete: false},
    {task: 'beat story', complete: false},
    {task: 'complete raid', complete: false},
  ]
  const userId = 1;
  const [story, setStory] = useState([])
  const [exotic, setExotic] = useState([])
  const [weekly, setWeekly] = useState([])
  const [other, setOther] = useState([])

  // get missions

  //useEffect to set state of missions on load

  //post new mission

  return (
    <div>
      <h1>Destiny 2 Do</h1>
      <Accordion
        title={"Weekly"}
        content={
          <Feed list={tempToDos}/>
        }
      />
      <Accordion
        title={"Exotic"}
        content={
          <Feed list={tempToDos}/>
        }
      />
      <Accordion
        title={"Story"}
        content={
          <Feed list={tempToDos}/>
        }
      />
      <Accordion
        title={"End Game / Other"}
        content={
          <Feed list={tempToDos}/>
        }
      />
      <button>Create New Mission</button>
    </div>
  )
}

export default App;
