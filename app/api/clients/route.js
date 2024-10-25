import { NextResponse } from "next/server";
import db from "../../utils/db"


export async function GET(req) {
    const {clients} = db.data;
    return NextResponse.json({
        clients:clients
    })
}