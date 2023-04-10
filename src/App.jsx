import React from 'react';
import Feed from './Feed.jsx';

function App() {
  const tempToDos = [
    {task: 'get exotic', complete: false},
    {task: 'beat story', complete: false},
    {task: 'complete raid', complete: false},
  ]

  return (
    <div>
      <h1>Destiny 2 Do</h1>
      <Feed list={tempToDos}/>
    </div>
  )
}

export default App;
