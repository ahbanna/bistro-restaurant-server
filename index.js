// const express = require("express");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 5000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // verify jwt starts
// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res
//       .status(401)
//       .send({ error: true, message: "Unauthorized access" });
//   }
//   //bearer token
//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res
//         .status(401)
//         .send({ error: true, message: "Unauthorized access" });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };
// // verify jwt end

// // Mongodb starts
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k7baavr.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // collection starts
//     const menuCollection = client.db("bistro").collection("menu");
//     const reviewCollection = client.db("bistro").collection("reviews");
//     const cartCollection = client.db("bistro").collection("carts");
//     const userCollection = client.db("bistro").collection("users");
//     // collection end

//     // menu READ starts
//     app.get("/menu", async (req, res) => {
//       const result = await menuCollection.find().toArray();
//       res.send(result);
//     });
//     // menu READ end

//     // review READ starts
//     app.get("/reviews", async (req, res) => {
//       const result = await reviewCollection.find().toArray();
//       res.send(result);
//     });
//     // review READ end

//     // carts CREATE api to receive data from client side starts
//     app.post("/carts", async (req, res) => {
//       const item = req.body;
//       console.log(item);
//       const result = await cartCollection.insertOne(item);
//       res.send(result);
//     });
//     // carts CREATE api to receive data from client side end

//     // carts READ starts
//     app.get("/carts", verifyJWT, async (req, res) => {
//       const email = req.query.email;
//       if (!email) {
//         res.send([]);
//       }
//       // jwt starts
//       const decodedEmail = req.decoded.email;
//       if (email !== decodedEmail) {
//         return res
//           .status(403)
//           .send({ error: true, message: "Forbidden access" });
//       }
//       // jwt end
//       const query = { email: email };
//       const result = await cartCollection.find(query).toArray();
//       res.send(result);
//     });
//     // carts READ end

//     // carts DELETE starts
//     app.delete("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await cartCollection.deleteOne(query);
//       res.send(result);
//     });
//     // carts DELETE end

//     // user CREATE api to receive data from client side starts
//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       console.log(user);
//       // for google starts
//       const query = { email: user.email };
//       const existingUser = await userCollection.findOne(query);
//       console.log("Existing user:", existingUser);
//       if (existingUser) {
//         return res.send({ message: "user already exists " });
//       }
//       // for google end
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });
//     // user CREATE api to receive data from client side end

//     // user READ starts
//     app.get("/users", async (req, res) => {
//       const result = await userCollection.find().toArray();
//       res.send(result);
//     });
//     // user READ end

//     // make UPDATE user as admin starts
//     app.patch("/users/admin/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           role: "admin",
//         },
//       };
//       const result = await userCollection.updateOne(filter, updateDoc);
//       res.send(result);
//     });
//     // make UPDATE user as admin end

//     // jwt starts
//     app.post("/jwt", (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "1h",
//       });
//       res.send({ token });
//     });
//     // jwt end

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// // Mongodb end

// app.get("/", (req, res) => {
//   res.send("Bistro restaurant server is running");
// });
// app.listen(port, () => {
//   console.log(`Bistro restaurant is running on port:${port}`);
// });

const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// verify jwt starts
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }
  //bearer token
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};
// verify jwt end

// Mongodb starts
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k7baavr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // collection starts
    const menuCollection = client.db("bistro").collection("menu");
    const reviewCollection = client.db("bistro").collection("reviews");
    const cartCollection = client.db("bistro").collection("carts");
    const userCollection = client.db("bistro").collection("users");
    // collection end

    // jwt starts
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    // jwt end

    // Warning: use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    // menu READ starts
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    // menu READ end

    // menu CREATE starts
    app.post("/menu", async (req, res) => {
      const newItem = req.body;
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });
    // menu CREATE end

    // menu DELETE starts
    app.delete("/menu/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });
    // menu DELETE end

    // review READ starts
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });
    // review READ end

    // carts CREATE api to receive data from client side starts
    app.post("/carts", async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });
    // carts CREATE api to receive data from client side end

    // carts READ starts
    app.get("/carts", verifyJWT, async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      }
      // jwt starts
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "Forbidden access" });
      }
      // jwt end
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    // carts READ end

    // carts DELETE starts
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });
    // carts DELETE end

    // user CREATE api to receive data from client side starts
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      // for google starts
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      console.log("Existing user:", existingUser);
      if (existingUser) {
        return res.send({ message: "user already exists " });
      }
      // for google end
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // user CREATE api to receive data from client side end

    // user READ starts
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    // user READ end

    // check if the user is admin or not starts
    // security layer: varifyJWT, email same, check admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });
    // check if the user is admin or not end

    // make UPDATE user as admin starts
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // make UPDATE user as admin end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Mongodb end

app.get("/", (req, res) => {
  res.send("Bistro restaurant server is running");
});
app.listen(port, () => {
  console.log(`Bistro restaurant is running on port:${port}`);
});
