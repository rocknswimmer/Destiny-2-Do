import React, {useState} from 'react';
import Accordion from './Accordion.js'
import axios from 'axios'

function Feed({list}) {

  // put functions for add note and mark complete, consider an edit mission function

  return (
    <div>
      {list.map((toDo) => {
        return <Accordion
        title={toDo.task}
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