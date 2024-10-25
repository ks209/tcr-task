import { JSONFilePreset } from 'lowdb/node'



const db = await JSONFilePreset('db.json', {
  "tasks": [
    {
      "id": "1728893479789",
      "description": "kkkkkkkkkkk",
      "member": "Dhruv",
      "client": "Cazzano",
      "status": "in-progress"
    },
    {
      "id": "1728893481763",
      "description": "kkkkkkkkkkk",
      "member": "Dhruv",
      "client": "Cazzano",
      "status": "completed"
    },
    {
      "id": "1729848830992",
      "description": "This is to inform the members of tricore revenue that Task App for Tricore is Successful ",
      "member": "Kartik",
      "client": "Aone",
      "status": "completed"
    }
  ],
  "teams": [
    "Manav",
    "Ashtmi",
    "Kartik",
    "Praveen",
    "Dhruv"
  ],
  "clients": [
    "Aone",
    "TrexPro",
    "Cazzano",
    "NoMushkil",
    "Gillori"
  ]
})

async function initDB() {
  await db.read();

}

await initDB(); 

export default db;
