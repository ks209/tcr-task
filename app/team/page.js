"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Nav from '../components/Nav';
import { useRouter } from 'next/navigation';

export default function teamPage() {

  const router = useRouter();
  
    const [team,setTeam]=useState([]);

    const [teamMember,setTeamMember]=useState([]);

    const fetchTeam = async()=>{

        try {
            const res = await axios.get("./api/teams");
            setTeam(res.data.teams);
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(()=>{
        fetchTeam();
    },[])


    const handleSubmit =async()=>{
        axios.post("./api/teams/add",{
            teamMember:teamMember
        })
        await fetchTeam();
    }

    const handleRemove = async(team)=>{
        axios.post("./api/teams/remove",{
            teamMember:team
        })
        await fetchTeam();
    }
    

  return (
    <div className='p-8'>
        <Nav/>
      <h1 className="text-2xl font-bold mb-4">Team</h1>

      <form onSubmit={(e)=>{e.preventDefault()}}>

        <div className=''>
        <input name='client' className='text-white mr-4 px-4 py-2 bg-white bg-opacity-10' placeholder='Member Name' onChange={(e)=>{setTeamMember(e.target.value)}}></input>
      <button onClick={()=>{handleSubmit()}} className="bg-green-500 w-[fit-content] text-black px-4 py-2 rounded hover:bg-green-600">
        Add Team Member
      </button>

        </div>


      </form>
      <ul className="mt-4 space-y-2">
        {team.map((team) => (
            <li onClick={()=>{router.push(`/team/${team}`)}} className=" text-zinc-800 p-4 flex justify-between bg-blue-100 rounded-lg hover:bg-blue-200 transition">
              <Link className='my-2'  href={`./team/${team}`}>
            <h2 className="text-xl font-semibold">{team}</h2>
            </Link>
            {/* <button onClick={()=>{handleRemove(team)}} className='text-red-600'> Remove</button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}