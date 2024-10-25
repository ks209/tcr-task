"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router'; // Use this for handling dynamic routing
import { ClipboardList, User, Briefcase, Clock, CircleDashed, CircleCheck, CircleX } from 'lucide-react';
import Nav from '@/app/components/Nav';

export default function Page() {
//   const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("")

  const fetchTask = async (id) => {
    try {
      const res = await axios.get(`/api/clients/${id}`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const id = currentUrl.split('/').pop(); // Extract the id from the URL
    setName(id);
    fetchTask(id);
  }, []);

  return (
    <div className="p-8">
        <Nav/>
      <h1 className="text-2xl font-bold mb-4">{`Task Overview ${name}`}</h1>
      <div className="flex justify-between">
        <ul className="mt-4  flex w-[75vw] flex-wrap gap-2 flex-col xl:flex-row">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white relative dark:bg-gray-800 shadow-md rounded-lg w-[80vw] xl:w-[20vw] overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">
                      <span
                        className={`ml-1 ${
                          task.status === 'completed'
                            ? 'text-green-500'
                            : task.status === 'in-progress'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                        }`}
                      >
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
                <div className="flex gap-1 absolute right-1 bottom-2">
                  <CircleDashed
                    color="yellow"
                    onClick={async () => {
                      await axios.get(`/api/tasks/inprogress/${task.id}`); // Consider using PUT for updates
                      await fetchTask(name); // Re-fetch tasks after update
                    }}
                  />
                  <CircleCheck
                    color="green"
                    onClick={async () => {
                      await axios.get(`/api/tasks/completed/${task.id}`); // Consider using PUT for updates
                      await fetchTask(name);
                    }}
                  />
                  <CircleX
                    color="red"
                    onClick={async () => {
                      await axios.get(`/api/tasks/remove/${task.id}`); // DELETE request for removal
                      await fetchTask(name);
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
