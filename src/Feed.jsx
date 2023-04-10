import React from 'react';

function Feed({list}) {

  return (
    <div>
      {list.map((toDo) => {
        return <div>{toDo.task}</div>
      })}
    </div>
  )
}

export default Feed;