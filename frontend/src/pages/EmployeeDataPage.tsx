import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

interface EmployeeData {
  id: string;
  name: string;
  role: string;
  salary: number;
}

const EmployeeDataPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [employeeList, setEmployeeList] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<EmployeeData[]>(
        "http://localhost:5000/api/employee-data"
      );
      setEmployeeList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitData = async () => {
    if (!name.trim() || !role.trim() || !salary.trim()) return;
    try {
      const newEmployee = {
        id: (employeeList.length + 1).toString(),
        name,
        role,
        salary: parseInt(salary),
      };
      console.log("New employee:", newEmployee);
      const response = await axios.post<EmployeeData>(
        "http://localhost:5000/api/employee-data",
        newEmployee
      );
      console.log("Response:", response.data);
      setEmployeeList([...employeeList, response.data]);
      setName("");
      setRole("");
      setSalary("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const entryLevelEmployees = employeeList.filter(
    (employee) => employee.salary < 50000
  );
  const seniorEmployees = employeeList.filter(
    (employee) => employee.salary >= 50000
  );

  return (
    <motion.div
      className="min-h-screen fixed inset-0 w-full bg-black flex items-center justify-between p-4 gap-4 overflow-auto"
      initial={{ opacity: 1, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: "100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-col h-screen w-full pt-24 items-center flex">
        <div className="border top-24 min-h-48 h-auto m-4 p-2 w-2/3 flex flex-col justify-center items-center rounded-lg bg-gray-800 border-gray-600">
          <th className="text-white text-2xl">Input Data</th>
          <p className="text-white">feature not working.... yet</p>
          <div className="flex flex-row justify-evenly w-full h-auto m-4">
            <input
              placeholder="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white text-center text-xl font-bold h-10 w-1/5 rounded-lg"
            />
            <input
              placeholder="salary"
              type="text"
              onChange={(e) => setSalary(e.target.value)}
              value={salary}
              className="bg-white text-center text-xl font-bold h-10 w-1/5 rounded-lg"
            />
            <input
              placeholder="position"
              type="text"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="bg-white text-center text-xl font-bold h-10 w-1/5 rounded-lg"
            />
          </div>
          <button
            className="mt-2 w-1/5 bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 p-2 rounded text-white font-semibold"
            onClick={submitData}
          >
            Submit
          </button>
        </div>
        <div className=" flex flex-row min-h-2/3 w-full gap-4">
          <div className="border min-h-1/3 h-auto p-2 border-gray-600 w-2/3 flex flex-col rounded-lg bg-gray-800">
            <th className="text-white">Entry Level:</th>
            <p className="text-white self-center">Name - Role - Salary</p>
            <div className="border border-gray-600 flex flex-col rounded-lg bg-gray-900">
              {entryLevelEmployees.map((employee) => (
                <table
                  key={employee.id}
                  className="text-white flex justify-center items-center"
                >
                  {employee.name} - {employee.role} - ₱{employee.salary}
                </table>
              ))}
            </div>
          </div>
          <div className="border p-2 border-gray-600 min-h-1/3 h-auto w-2/3 flex flex-col rounded-lg bg-gray-800">
            <th className="text-white">Senior:</th>
            <p className="text-white self-center">Name - Role - Salary</p>
            <div className="border border-gray-600 flex flex-col rounded-lg bg-gray-900">
              {seniorEmployees.map((employee) => (
                <table
                  key={employee.id}
                  className="text-white flex justify-center items-center"
                >
                  {employee.name} - {employee.role} - ₱{employee.salary}
                </table>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeDataPage;
