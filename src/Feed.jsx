import React, {useState} from 'react';
import Accordion from './Accordion.js'
import axios from 'axios'
import Modal from './Modal.js'

function Feed({list}) {

  // put functions for add note and mark complete, consider an edit mission function

  return (
    <div>
      {list.map((toDo, i) => {
        return <Accordion
        key={i}
        title={toDo.mission}
        content={
          <div>
            <p>note to go here in a text field with conditions?</p>
            <button>edit note</button> <button>mark complete/mabye make check box?</button>
          </div>
        }
        />
      })}
    </div>
  )
}

export default Feed;