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
  const [archive, setArchive] = useState([])
  const [addingNew, setAddingNew] = useState(false)
  const [mission, setMission] = useState('')
  const [category, setCategory] = useState('')
  const approved = '0123456789abcdefghijklmnopqrstuvwxyz /.,:?!-'.split('')

  // get missions
  const getMissions = () => {
    getUnfinished()
    getArchive()
  }

  const getUnfinished = () => {
    axios.get(`/missions/${userID}`)
      .then((res) => {
        // console.log(res.data.rows)
        let categories = res.data.rows
        var exoticsFound = false
        var weeklyFound = false
        var storyFound = false
        var otherFound = false

        for(let i = 0; i < categories.length; i++) {
          if(categories[i].category === 'exotic'){
            // console.log('array?: ', categories[i].todos, Array.isArray(categories[i].todos))
            setExotic(categories[i].todos)
            exoticsFound = true
          }
          if(categories[i].category === 'weekly'){
            setWeekly(categories[i].todos)
            weeklyFound = true
          }
          if(categories[i].category === 'story'){
            setStory(categories[i].todos)
             storyFound = true
          }
          if(categories[i].category === 'other') {
            setOther(categories[i].todos)
            otherFound = true
          }

        }

        if(!exoticsFound){
          setExotic([])
        }
        if(!weeklyFound){
          setWeekly([])
        }
        if(!storyFound){
          setStory([])
        }
        if(!otherFound){
          setOther([])
        }

      })
      .catch((err) => {
        console.log('error getting missions from server')
      })
  }

  const getArchive = () => {
    axios.get(`/archive/${userID}`)
      .then((res) => {
        setArchive(res.data.rows)
      })
      .catch((err) => {
        console.log('error retreiving archived missions')
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
    <div id="app">
      {/* <button onClick={() => {console.log('exotic:', exotic, 'weekly: ', weekly, 'Story: ', story, 'Other: ', other)}}>sanity check</button> */}
      <h1>Destiny 2 Do</h1>
      {weekly.length > 0 && <Accordion
        title={"Weekly"}
        content={
          <Feed list={weekly} update={() => {getMissions()}} archive={false} userID={userID} />
        }
        category={'weekly'}
      />}
      {exotic.length > 0 && <Accordion
        title={"Exotic"}
        content={
          <Feed list={exotic} update={() => {getMissions()}}  archive={false} userID={userID} />
        }
        category={'exotic'}
      />}
      {story.length > 0 && <Accordion
        title={"Story"}
        content={
          <Feed list={story} update={() => {getMissions()}} archive={false} userID={userID} />
        }
        category={'story'}
      />}
      {other.length > 0 && <Accordion
        title={"End Game / Other"}
        content={
          <Feed list={other} update={() => {getMissions()}} archive={false} userID={userID} />
        }
        category={'other'}
      />}
      {archive.length > 0 && <Accordion
        title={"Archived Missions"}
        content={
          <Feed list={archive} update={() => {getMissions()}} archive={true} userID={userID} />
        }
        category={'archive'}
      />}
      <button onClick={openForm}>Create New Mission</button>
      {addingNew && <Modal
      close={() => {openForm()}}
      content={
        <div className="modal-content">
          <h1 className="create">Create A New Mission!</h1>
          <form onSubmit={submitMission} className="form">

            <div className="mission">
            <label>Mission Name:</label>
            <div>
            <input type="text" placeholder="i.e. Get Exotic" onChange={missionValue}></input>
            <span>{`${mission.length}/60`}</span>
            </div>
            </div>
            <label>Mission Category:</label>
            <select onChange={categoryValue}>
              <option value={0}>Select</option>
              <option value={'weekly'}>Weekly</option>
              <option value={'exotic'}>Exotic</option>
              <option value={'story'}>Story</option>
              <option value={'other'}>Other/End Game</option>
            </select>
            <button type="submit" className="new">Create Mission</button>
          </form>
        </div>
      }
      />}
    </div>
  )
}

export default App;
