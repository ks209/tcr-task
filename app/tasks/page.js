"use client"
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ClipboardList, User, Briefcase, Clock, CircleDashed, CircleCheck, CircleX } from 'lucide-react'
import AddTask from '../components/AddTask'
import Nav from '../components/Nav'

export default function TasksPage() {
  const [tasks,setTasks] = useState([])

  const fetchTask = async()=>{
    try {
        const res = await axios.get("../api/tasks");

        setTasks(res.data);
    } catch (error) {
        console.error(error)
    }
  }


  useEffect(()=>{
     fetchTask();
  },[])

//   useEffect(()=>{
//     fetchTask();
//  },[tasks])

  return (
    <div className='p-8 flex flex-col justify-center items-center'>
        <Nav/>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className='flex flex-col xl:flex-row justify-between'>

      <AddTask tasks={tasks} setTasks={setTasks}/>
      <ul className="mt-4 flex w-[90vw] xl:w-[75vw] flex-wrap gap-2">
      {tasks.map((task) => (
          <li key={task.id} className="bg-white relative dark:bg-gray-800 shadow-md rounded-lg w-[100%] xl:w-[20vw] overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium"> 
                  <span className={`ml-1 ${
                      task.status === 'completed' ? 'text-green-500' :
                      task.status === 'in-progress' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm font-medium">{task.member}</span>
              </div>
              <div className="flex items-center col-span-2">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium"> {task.client}</span>
              </div>
            </div>
            <div className='flex gap-1 absolute right-1 bottom-2'><CircleDashed color='yellow' onClick={async()=>{
                await axios.get(`../api/tasks/inprogress/${task.id}`)
                await fetchTask()
            }} />
            <CircleCheck color='green' onClick={async()=>{
                await axios.get(`../api/tasks/completed/${task.id}`)
                await fetchTask()
            }} />
            <CircleX color='red' onClick={async()=>{
                await axios.get(`../api/tasks/remove/${task.id}`)
                await fetchTask()
            }} /></div>
          </div>
        </li>
      ))}
    </ul>
                      </div>
    </div>
  )
}