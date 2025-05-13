import { useState } from "react";
import { Employee } from "../types/employee";

const API_URL =
  "https://components-design-default-rtdb.firebaseio.com/employees.json";

export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const employeesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setEmployees(employeesArray);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = async (employee: Employee) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const updateEmployee = async (id: string, updatedEmployee: Employee) => {
    try {
      const response = await fetch(
        `https://components-design-default-rtdb.firebaseio.com/employees/${id}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === id ? { ...emp, ...updatedEmployee } : emp
        )
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(
        `https://components-design-default-rtdb.firebaseio.com/employees/${id}.json`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return {
    employees,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
