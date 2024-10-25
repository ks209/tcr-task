import db from "../../utils/db"
import { NextResponse } from "next/server";



export async function POST(req) {
    
    const data = await req.json();

    const newTeam = db.data.teams.filter(x=> x!==data.teamMember);

    db.data.teams = newTeam;

    
    db.write();
    return NextResponse.json(`Succesfull Removed ${data.teamMember}`)
}