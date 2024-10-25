import { NextResponse } from "next/server";
import db from "../../../utils/db"


export async function GET(req, { params }) {

    const {id} = params;
    const clients = db.data.tasks.filter((x)=>x.client === id)
    db.write();
    return NextResponse.json({
        tasks:clients
    })

}