const express = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofnl5ln.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // All collection
        const AllUsersCollection = client.db('RandomDB').collection('Users');
        const AllCatalogCollection = client.db('RandomDB').collection('Catalog');
        const AllItemsCollection = client.db('RandomDB').collection('Items');
        const AllOrderCollection = client.db('RandomDB').collection('order');





        // all users api
        app.get('/users', async (req, res) => {
            const cursor = AllUsersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // all seller list api
        app.get('/users/seller', async (req, res) => {
            const role = 'Seller';
            console.log(role);
            const query = { role: role }
            const result = await AllUsersCollection.find(query).toArray();
            res.send(result);
        })

        // seller check api

        app.get('/users/seller/:email', async (req, res) => {
            const email = req.params.email;
            // console.log(email);
            const query = { email: email };
            const user = await AllUsersCollection.findOne(query);
            let seller = false;
            if (user) {
                seller = user?.role === 'Seller';
            }
            // console.log(seller);
            res.send({ seller: seller });
        })





        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
            res.send({ token });
            // console.log(token);
        })
        // users post api
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await AllUsersCollection.insertOne(newUser);
            res.send(result);
        })







        // all catalog get api

        app.get('/catalog', async (req, res) => {

            const cursor = AllCatalogCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        // email wise catalog get api
        app.get('/catalog/:email', async (req, res) => {
            const email = req.params.email;
            // console.log('cc', email);
            const query = { email: email }
            const cursor = AllCatalogCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        // catalog post api
        app.post('/catalog', async (req, res) => {
            const newCatalog = req.body;
            console.log(newCatalog);
            const query = { email: newCatalog.email }
            const existingUser = await AllCatalogCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await AllCatalogCollection.insertOne(newCatalog);
            res.send(result);
        })



        // all item get api
        app.get('/items', async (req, res) => {
            const cursor = AllItemsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        // email wise item get api
        app.get('/items/:email', async (req, res) => {
            const email = req.params.email;
            console.log('cc', email);
            const query = { email: email }
            const cursor = AllItemsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        // specific id wise item get api
        app.get('/itemss/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await AllItemsCollection.findOne(query);
            res.send(result);
        })
        // all item post api
        app.post('/items', async (req, res) => {
            const newWorkSheet = req.body;
            console.log(newWorkSheet);
            const result = await AllItemsCollection.insertOne(newWorkSheet);
            console.log(result);
            res.send(result);
        })
        // update item id wise api
        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updateTask = req.body;
            const task = {
                $set: {
                    cname: updateTask.cname,
                    iname: updateTask.iname,
                    price: updateTask.price,
                    email: updateTask.email,

                }
            }

            const result = await AllItemsCollection.updateOne(filter, task, option);
            console.log(updateTask);
            res.send(result);

        })


        // delete api for item
        app.delete('/items/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await AllItemsCollection.deleteOne(query);
            res.send(result);
        })




        // email wise item get api
        app.get('/item/:email', async (req, res) => {
            const email = req.params.email;

            // console.log('cc', email);
            const query = { email: email }

            const result = await AllItemsCollection.find(query).toArray();
            res.send(result);
        })


        // order related api
        app.get('/order', async (req, res) => {
            const cursor = AllOrderCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // email wise order get api
        app.get('/order/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { buyerEmail: email }
            const result = await AllOrderCollection.find(query).toArray();
            res.send(result);
        })



        // email wise order get api
        app.get('/sorder/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { sellerEmail: email }
            const result = await AllOrderCollection.find(query).toArray();
            res.send(result);
        })
        // order post api
        app.post('/order', async (req, res) => {
            const newOrder = req.body;
            console.log(newOrder);
            const result = await AllOrderCollection.insertOne(newOrder);
            console.log(result);
            res.send(result);
        })
        // order related api



        // all buyer api
        // **********************************************


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(port, () => {
    console.log(`server is running in port: ${port}`);
})