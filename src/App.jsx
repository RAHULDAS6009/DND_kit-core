import { useState } from "react";
import "./App.css";
import "./index.css";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "go to gym " },
    { id: 2, title: "Read a book" },
    { id: 3, title: "new thing happen in 2024" },
  ]);

const getTaskPos=(id)=>{
  return tasks.findIndex((task)=>{
    return task.id===id;
  })
}

  const handleDragEnd=(e)=>{
  const {active,over}=e;

  if(active.id === over.id){
    return ;
  }

  setTasks((tasks) => {
    const originalPos= getTaskPos(active.id);
    console.log(originalPos);    
    const newPos= getTaskPos(over.id)
    console.log(newPos);    


    return arrayMove(tasks,originalPos,newPos);
  })

  return 
}

  return (
    <div className="App">
      My Task✅
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

function Column({ tasks }) {
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy} >
        {tasks.map((task) => {
          return <Task id={task.id} title={task.title}/>
        })}
      </SortableContext>
    </div>
  );
}

function Task({ id,title }) {
  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id});

  const style={transition,
    transform:CSS.Transform.toString(transform)
  }

  return <div {...attributes} {...listeners} ref={setNodeRef} style={style} className="task" >
    {title}
  </div>;
}

export default App;
