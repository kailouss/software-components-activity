import { useState } from "react";
import { useNavigate } from "react-router";
import isMobileView from "../../ui/isMobile";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  const handleNavigation = (path: string) => {
    toggleSidebar();
    navigate(path);
  };

  return (
    <div className="header absolute w-screen h-20 bg-black border-b-white border-b-4 z-50">
      <div className="px-2 flex items-center h-full w-full select-none  transition-all">
        {isMobileView() ? (
          <>
            <div className="logo font-lexend font-bold text-white text-2xl md:text-4xl">
              KaiLouSs
            </div>
            <button
              onClick={toggleSidebar}
              className="font-lexend font-light text-white w-full flex justify-end text-2xl md:text-4xl hover:text-blue-500"
            >
              ☰
            </button>
            {isSidebarOpen && (
              <div className="sidebar bg-opacity-80 fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50">
                <button
                  onClick={toggleSidebar}
                  className="absolute top-4 right-4 text-white hover:text-red-500"
                >
                  ✖
                </button>
                <div className="menu mt-12 flex flex-col gap-4 text-lg">
                  <button
                    className="font-lexend font-light hover:text-blue-500"
                    onClick={() => handleNavigation("/")}
                  >
                    Home
                  </button>
                  <button
                    className="font-lexend font-light hover:text-blue-500"
                    onClick={() => handleNavigation("/contents")}
                  >
                    Works
                  </button>
                  <button
                    className="font-lexend font-light hover:text-blue-500"
                    onClick={() => handleNavigation("/about")}
                  >
                    About
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="logo font-lexend font-bold text-white text-2xl md:text-4xl">
              KaiLouSs
            </div>
            <div className="content flex items-center gap-6 mx-12 text-white text-sm md:text-base">
              <button
                className="font-lexend font-light hover:text-blue-500"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <p className="font-lexend font-thin text-3xl">|</p>
              <button
                className="font-lexend font-light hover:text-blue-500"
                onClick={() => navigate("/contents")}
              >
                Works
              </button>
              <p className="font-lexend font-thin text-3xl">|</p>
              <button
                className="font-lexend font-light hover:text-blue-500"
                onClick={() => navigate("/about")}
              >
                About
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
