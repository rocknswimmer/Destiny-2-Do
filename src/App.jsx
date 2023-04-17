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
  const userID = 1;
  const [story, setStory] = useState([])
  const [exotic, setExotic] = useState([])
  const [weekly, setWeekly] = useState([])
  const [other, setOther] = useState([])

  // get missions
  const getMissions = () => {
    axios.get(`/missions/${userID}`)
      .then((res) => {
        // console.log(res.data.rows)
        let categories = res.data.rows

        for(let i = 0; i < categories.length; i++) {
          if(categories[i].category === 'exotic'){
            // console.log('array?: ', categories[i].todos, Array.isArray(categories[i].todos))
            setExotic(categories[i].todos)
          }
          if(categories[i].category === 'weekly'){
            setWeekly(categories[i].todos)
          }
          if(categories[i].category === 'story'){
            setStory(categories[i].todos)
          }
          if(categories[i].category === 'other') {
            setOther(categories[i].todos)
          }

        }
        //got through rows which should be missions by category and set each mission list
      })
      .catch((err) => {
        console.log('error getting missions from server')
      })
  }

  //useEffect to set state of missions on load
  useEffect(() => {
    getMissions()
  }, [])

  //post new mission

  return (
    <div>
      <button onClick={() => {console.log('exotic:', exotic, 'weekly: ', weekly, 'Story: ', story, 'Other: ', other)}}>sanity check</button>
      <h1>Destiny 2 Do</h1>
      <Accordion
        title={"Weekly"}
        content={
          <Feed list={weekly}/>
        }
      />
      <Accordion
        title={"Exotic"}
        content={
          <Feed list={exotic}/>
        }
      />
      <Accordion
        title={"Story"}
        content={
          <Feed list={story}/>
        }
      />
      <Accordion
        title={"End Game / Other"}
        content={
          <Feed list={other}/>
        }
      />
      <button>Create New Mission</button>
    </div>
  )
}

export default App;
