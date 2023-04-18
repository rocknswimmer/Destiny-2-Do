import React, {useState} from 'react';
import Accordion from './Accordion.js'
import axios from 'axios'
import Modal from './Modal.js'

function Feed({list, update, archive, userID}) {

  const [doubleCheck, setDoubleCheck] = useState(false)
  const [reset, setReset] = useState(false)
  // put functions for add note and mark complete, consider an edit mission function
  const checkComplete = () => {
    setDoubleCheck(!doubleCheck)
  }
  const markComplete = (mission) => {
    //console.log('successful double check')
    axios.put(`/complete/${mission}`)
      .then((res) => {
        update()
        checkComplete()
      })
      .catch((err) => {
        console.log('error marking mission complete')
      })
    //get missions
  }

  const unarchive = (mission) => {
    axios.put(`/unarchive/${mission}`)
      .then((res) => {
        update()
        checkComplete()
      })
      .catch((err) => {
        console.log('error unarchiving mission')
      })
  }

  const checkReset = () => {
    setReset(!reset)
  }
  const weeklyReset = () => {
    axios.put(`/weeklyReset/${userID}`)
      .then((res) => {
        update()
        checkReset()
      })
      .catch((err) => {
        console.log('error resetting weekly missions')
      })
  }

  return (
    <div>
      {list.length === 0 && <div>All Missions Complete</div>}
      {list.length > 0 && list.map((toDo, i) => {
        return <Accordion
        key={i}
        title={toDo.mission}
        content={
          <div>
            <p>note to go here in a text field with conditions?</p>
            <button>edit note</button>
            {!archive && <button onClick={checkComplete}>Mission Complete</button>}
            {archive && <button onClick={checkComplete}>Unarchive Mission</button>}
            {doubleCheck && <Modal  close={() => {checkComplete()}} content={
              <div>
                {!archive && <div>
                <h3>You Have Completed This mission?</h3>
                <button onClick={() => {markComplete(toDo.id)}}>Yes</button>
                </div>}
                {archive && <div>
                <h3>You Want To Unarchive This mission?</h3>
                <button onClick={() => {unarchive(toDo.id)}}>Yes</button>
                </div>}
              </div>
            } />}
          </div>
        }
        />
      })}
      {archive && <button onClick={checkReset}>Weekly Reset</button>}
      {reset && <Modal close={() => {checkReset()}} content={
        <div>
          <h3>Reset The Weekly Missions?</h3>
          <button onClick={weeklyReset}>Yes</button>
        </div>
      }/>}
    </div>
  )
}

export default Feed;