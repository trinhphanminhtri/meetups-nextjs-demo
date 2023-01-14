// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://meetups:lIeXr1vW9j9JlZuF@cluster0.lnx561r.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db(); // to get hold of database

    // table meetups
    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close()

    res.status(201).json({message:"Meetup inserted!"})
  }
}
export default handler;
