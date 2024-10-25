import { NextResponse } from "next/server";
import db from "../../../utils/db"



export async function POST(req) {
    
    const body = await req.json();
    db.data.teams.push(body.teamMember);
    db.write();

    return NextResponse.json("successfull added team member");
}