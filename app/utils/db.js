import { JSONFilePreset } from 'lowdb/node'



const db = await JSONFilePreset('./db.json', { tasks: [], teams: ["Dhruv", "Harshit", "Manav", "Ashtmi", "Kartik"], clients: ["Cazzano", "NoMushkil", "Aone", "TrexPro"] })

async function initDB() {
  await db.read();

}

await initDB(); 

export default db;
