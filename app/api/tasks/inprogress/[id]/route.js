import db from '../../../../utils/db'
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;


    const task = db.data.tasks.find(task => task.id === id);

    if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    task.status = "in-progress";

    db.write();

    return NextResponse.json({ message: "Task updated successfully", task });
}
