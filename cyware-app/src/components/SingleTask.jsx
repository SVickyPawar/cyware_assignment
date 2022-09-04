import React from 'react'

const SingleTask = ({task}) => {
     const dragStart = (e, id) => {
        
        e.dataTransfer.setData("todoId", id)
        
        console.log(id)
  return (
    
         <div draggable={true} onDragStart={(e)=>dragStart(e,task.id)} style={{height:"30px",margin:"5px"}}  key={task.id}>
          <p style={{marginTop:"0px"}}>{task.todo}</p>
    </div>
   
  )
}

export default SingleTask