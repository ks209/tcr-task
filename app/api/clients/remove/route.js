import db from "@/app/utils/db";
import { NextResponse } from "next/server";



export async function POST(req) {
    
    const data = await req.json();

    const newClients = db.data.clients.filter(x=> x!==data.client);

    db.data.clients = newClients;
    
    db.write();
    return NextResponse.json(`Succesfull Removed ${data.client}`)
}