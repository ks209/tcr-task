"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Link from 'next/link';
import {useRouter } from 'next/navigation';

export default function ClientsPage() {

  const router = useRouter()

    const [allClients,setAllClients] = useState([]);
  
    const fetchclient=async()=>{
        try{
            const response = await axios.get("/api/clients")
            setAllClients(response.data.clients);
        }catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        fetchclient();
    }, [])
    

  const [clientName,setClientName] = useState("");

  const handleSubmit=async()=>{

    const response = await axios.post("./api/clients/add",{
        clientName:clientName
    })

    await fetchclient();

  }


  const handleRemove = async(client)=>{
    await axios.post("./api/clients/remove",{
        client:client
    })
    await fetchclient();
    }

  return (
    <div className='p-8'>
        <Nav/>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>

        <div className='flex'>
        <input name='client' className='text-white mr-4 px-4 py-2 bg-white bg-opacity-10' placeholder='Client Name' onChange={(e)=>{setClientName(e.target.value)}}></input>
      <button onClick={()=>{handleSubmit()}} className="bg-green-500 mt-2 text-black px-4 py-2 rounded hover:bg-green-600">
        Add Client
      </button>

        </div>

      </form>
      <ul className="mt-4 space-y-2 text-black">
        {allClients.map((client,index) => (
          <li key={index} onClick={()=>(router.push(`/clients/${client}`))} className=" flex justify-between  p-4 bg-green-100 rounded-lg hover:bg-green-200 transition">
            <Link className='my-2'  href={`./team/${client}`}>
            <h2 className="text-xl font-semibold">{client}</h2>
            </Link>
            {/* <button onClick={()=>{handleRemove(client)}} className='text-red-600'> Remove</button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}