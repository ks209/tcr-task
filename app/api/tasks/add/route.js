import db from "@/app/utils/db";
import { NextResponse } from "next/server";



export async function POST(req) {
    
    const data = await req.json();

    db.data.tasks.push(data.task);

    db.write();

    return NextResponse.json("Task Created SuccessFull")
}