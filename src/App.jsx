import React, {useState, useEffect} from 'react';
import Feed from './Feed.jsx';
import Accordion from './Accordion.js'
import Modal from './Modal.js'
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
  const [addingNew, setAddingNew] = useState(false)
  const [mission, setMission] = useState('')
  const [category, setCategory] = useState('')
  const approved = '0123456789abcdefghijklmnopqrstuvwxyz /.,:?!-'.split('')

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

  const openForm = () => {
    setAddingNew(!addingNew)
  }
  //post new mission
  const submitMission = (e) => {
    e.preventDefault()

    console.log(mission, category, category.length, category === '', category !== '')

    if((category.length > 0 && category !== '0') && ((mission.length > 0 && mission.length <= 60) && mission.split('').every((char) => {return approved.indexOf(char) !== -1}))){
      axios.post(`/newMission/${userID}`, {mission: mission, category: category})
        .then((res) => {
          console.log(res)
          getMissions()
          setAddingNew(false)
        })
    } else {
      alert(`must have a category selected, can only use approved values for security, those values are ${approved}`)
    }
  }

  const missionValue = (e) => {
    setMission(e.target.value)
  }

  const categoryValue = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div>
      {/* <button onClick={() => {console.log('exotic:', exotic, 'weekly: ', weekly, 'Story: ', story, 'Other: ', other)}}>sanity check</button> */}
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
      <button onClick={openForm}>Create New Mission</button>
      {addingNew && <Modal
      close={() => {openForm()}}
      content={
        <div>
          <form onSubmit={submitMission}>
            <h1>Create A New Mission!</h1>
            <div>
            <label>Mission Name:</label>
            <input type="text" placeholder="i.e. Get Exotic" onChange={missionValue}></input>
            <span>{`${mission.length}/60`}</span>
            </div>
            <label>Mission Category:</label>
            <select onChange={categoryValue}>
              <option value={0}>Select</option>
              <option value={'weekly'}>Weekly</option>
              <option value={'exotic'}>Exotic</option>
              <option value={'story'}>Story</option>
              <option value={'other'}>Other/End Game</option>
            </select>
            <button type="submit">Create Mission</button>
          </form>
        </div>
      }
      />}
    </div>
  )
}

export default App;
