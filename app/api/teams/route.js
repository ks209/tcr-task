import { NextResponse } from "next/server";
import db from "../../utils/db"


export async function GET(req) {

    const {teams} = db.data;


    return NextResponse.json({
        teams:teams,
    })


}