import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingGreat {
  id: number;
  x: number;
  y: number;
}

const ContentsPage = () => {
  const [floatingGreat, setFloatingGreat] = useState<FloatingGreat[]>([]);

  const handleClick = () => {
    const id = Date.now();
    const x = Math.random() * window.innerWidth * 0.8;
    const y = Math.random() * window.innerHeight * 0.8;

    setFloatingGreat((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setFloatingGreat((prev) => prev.filter((text) => text.id !== id));
    }, 1500);
  };

  return (
    <motion.div
      className="bg-black fixed inset-0 w-full min-h-screen flex flex-col items-center justify-center text-white p-4"
      initial={{ opacity: 1, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: "100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Contents Page</h1>
        <p className="text-gray-300 mb-4">This is the contents page.</p>

        <button
          onClick={handleClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all active:scale-95"
        >
          Great!
        </button>
      </div>

      {floatingGreat.map((text) => (
        <motion.div
          key={text.id}
          className="absolute text-2xl font-bold text-yellow-400 drop-shadow-lg"
          style={{ left: text.x, top: text.y }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          transition={{ duration: 1.5 }}
        >
          Great! 👍
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentsPage;
