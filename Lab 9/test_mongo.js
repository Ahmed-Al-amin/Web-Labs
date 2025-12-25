const { MongoClient, ServerApiVersion } = require('mongodb');

// Your connection string with the password from Image 1 inserted
const uri = "mongodb+srv://ahmedmuhammeed331_db_user:7br92DdGeLPLTnK9@amin.9ob1rht.mongodb.net/?appName=amin";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);