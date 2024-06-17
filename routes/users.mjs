import express from 'express';
import connectDb from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
const router = express.Router();
(async () => {
  const db = await connectDb();
  // Getting all users
  router.get('/users', async (req, res) => {
    try {
      const users = await db.collection('users').find().toArray();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
})();
export default router;



// import express from "express";
// import db from "../db/conn.mjs";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// (async () => {
//   const db = await db();

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await db.collection('users').find().toArray();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// })();

// export default router;















