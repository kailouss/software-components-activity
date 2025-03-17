import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EmployeeForm } from "../components/employeeData/EmployeeForm";
import { EmployeeList } from "../components/employeeData/EmployeeList";
import { useEmployee } from "../hooks/useEmployees";
import { Employee } from "../types/employee";

export const EmployeePage: React.FC = () => {
  const {
    employees,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployee();
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSubmit = (employee: Employee) => {
    if (currentEmployee) {
      updateEmployee(currentEmployee.id!, employee);
    } else {
      addEmployee(employee);
    }
    setCurrentEmployee(null);
  };

  return (
    <motion.div
      className="bg-black fixed inset-0 w-full min-h-screen overflow-auto flex flex-col items-center justify-center text-white p-4"
      initial={{ opacity: 1, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg mt-[25rem]">
        <h1 className="text-2xl font-semibold mb-4">Employee Management</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentEmployee ? "Edit Employee" : "Add Employee"}
          </h2>
          <EmployeeForm
            key={currentEmployee ? currentEmployee.id : "add"}
            initialData={currentEmployee || undefined}
            onSubmit={handleSubmit}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Employee List</h2>
          {employees.length > 0 ? (
            <EmployeeList
              employees={employees}
              onEdit={setCurrentEmployee}
              onDelete={deleteEmployee}
            />
          ) : (
            <p className="text-gray-400">No employees found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
