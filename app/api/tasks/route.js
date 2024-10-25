import db from "@/app/utils/db";
import { NextResponse } from "next/server";



export async function GET(req) {
    console.log(db.data.tasks)
    return NextResponse.json (db.data.tasks);
}