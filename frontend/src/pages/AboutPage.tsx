import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

interface Feedback {
  id: string;
  text: string;
}

const AboutPage = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Feedback[]>(
        "http://localhost:5000/api/feedback"
      );
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      const response = await axios.post<Feedback>(
        "http://localhost:5000/api/feedback",
        { text: feedback }
      );
      setFeedbackList([...feedbackList, response.data]);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <motion.div
      className="bg-black fixed inset-0 w-full min-h-screen flex flex-col items-center justify-center text-white p-4"
      initial={{ opacity: 1, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Feedback</h2>
        <textarea
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 p-2 rounded text-white font-semibold"
          onClick={submitFeedback}
        >
          Submit
        </button>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-2">User Feedback</h2>
        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <ul className="bg-gray-800 p-4 rounded-lg max-h-40 overflow-auto">
            {feedbackList.map((item) => (
              <li
                key={item.id}
                className="border-b border-gray-600 p-2 last:border-none"
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default AboutPage;
