import { FaArrowCircleRight } from "react-icons/fa";

const GetStartedButton = () => {
  return (
    <button className="border text-2xl w-auto h-10 bg-blue-600 px-4 py-6 rounded-2xl hover:bg-blue-700 transition-all flex flex-row items-center gap-2 hover:scale-95">
      Get Started
      <FaArrowCircleRight size={20} />
    </button>
  );
};

export default GetStartedButton;
