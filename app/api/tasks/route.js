import db from "../../utils/db";
import { NextResponse } from "next/server";



export async function GET(req) {
    console.log(db.data.tasks)

    return NextResponse.json ({tasks:db.data.tasks});
}