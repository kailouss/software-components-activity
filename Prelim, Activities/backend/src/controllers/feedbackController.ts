import { Request, Response } from "express";
import { db } from "../firebase.js";
import { DocumentData } from "firebase-admin/firestore";

export const getFeedback = async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("feedback").get();
    const feedbackList = snapshot.docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newFeedback = await db.collection("feedback").add({ text });
    res.json({ id: newFeedback.id, text });
  } catch (error) {
    res.status(500).json({ error: "Failed to add feedback" });
  }
};
