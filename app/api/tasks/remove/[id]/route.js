import db from '../../../../utils/db'
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const { id } = params;


    const tasks = db.data.tasks.filter(task => task.id !== id);

    db.data.tasks=tasks;

    db.write();

    return NextResponse.json({ message: "Task Removed successfully"});
}
