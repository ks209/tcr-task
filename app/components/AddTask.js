'use client'

import axios from "axios"
import { useEffect, useState } from "react"



export default function AddTask(props) {
    const [client,setClient] = useState("");
    const [member,setMember] = useState("");
    const [description,setDescription] = useState("");
    const [btn,setBtn] = useState(true)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newTask = {
        id: Date.now().toString(),
        description,
        member: member,
        client:client,
        status: "Assigned"
    }
    
    setBtn(false);
    await axios.post("../api/tasks/add",{
        task:newTask
    })
    
    props.setTasks([...props.tasks,newTask])
    setBtn(true);
  }


  const [members,setMembers] = useState([]);
  const [clients,setClients] = useState([]);

  const fetchDetails = async()=>{
    const response = await axios.get("../api/teams");
    const res = await axios.get("../api/clients");
    setMembers([...response.data.teams]);
    setClients([...res.data.clients]);
}

  useEffect(()=>{
    try {
        fetchDetails();
    } catch (error) {
        console.log(error);
    }
  },[])

  return (
      <div className="p-8 w-[85vw] xl:w-[25vw]">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        
        <div>
          <label htmlFor="description" className="block text-white">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full p-2 border  px-4 py-3  border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 ease-in-out placeholder-gray-900 bg-slate-50/[0.3] text-white"
          />
        </div>
        <div>
          <label htmlFor="team" className="block text-white">Assign to:</label>
          <select
            id="team"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            className="w-full p-2 border  px-4 py-3  border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 ease-in-out placeholder-gray-900 bg-slate-50/[0.3] text-white"
          >
            <option className="text-black" value="">Select an team</option>
            {members.map((team) => (
              <option className="text-black" value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="client" className="block text-white">Client:</label>
          <select
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            className="w-full p-2 border  px-4 py-3  border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 ease-in-out placeholder-gray-900 bg-slate-50/[0.3] text-white"
          >
            <option className="text-black" value="">Select a client</option>
            {clients.map((client) => (
              <option className="text-black" value={client}>{client}</option>
            ))}
          </select>
        </div>
        {btn && <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Add Task
        </button>}
      </form>
    </div>
  )
}