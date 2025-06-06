import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header/Header";
import AboutPage from "./pages/AboutPage";
import ContentsPage from "./pages/ContentsPage";
import LandingPage from "./pages/LandingPage";
import EmployeeDataPage from "./pages/EmployeeDataPage";
import { EmployeePage } from "./pages/EmployeePage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contents" element={<ContentsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/employee-data" element={<EmployeeDataPage />} />
        <Route path="/employee-crud" element={<EmployeePage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
