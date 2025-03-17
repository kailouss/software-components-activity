import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const snapshot = await db.collection("feedback").get();
    const feedbackList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Feedback cannot be empty" });

    const docRef = await db.collection("feedback").add({ text });
    res.json({ id: docRef.id, text });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

export default router;
