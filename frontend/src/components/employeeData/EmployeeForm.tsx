import React, { useState, useEffect } from "react";
import { Employee } from "../../types/employee";

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (employee: Employee) => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [employee, setEmployee] = useState<Employee>(
    initialData || {
      firstName: "",
      lastName: "",
      groupName: "",
      role: "",
      expectedSalary: 0,
      expectedDateOfDefense: "",
    }
  );

  // Reset form state when initialData changes
  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
    } else {
      setEmployee({
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateOfDefense: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(employee);
    // Clear the form after submission
    if (!initialData) {
      setEmployee({
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateOfDefense: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            First Name
          </label>
          <input
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Last Name
          </label>
          <input
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">
          Group Name
        </label>
        <input
          name="groupName"
          value={employee.groupName}
          onChange={handleChange}
          placeholder="Group Name"
          required
          className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Role</label>
        <input
          name="role"
          value={employee.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">
          Expected Salary
        </label>
        <input
          name="expectedSalary"
          type="number"
          value={employee.expectedSalary}
          onChange={handleChange}
          placeholder="Expected Salary"
          required
          className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">
          Expected Date of Defense
        </label>
        <input
          name="expectedDateOfDefense"
          type="date"
          value={employee.expectedDateOfDefense}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 p-2 rounded text-white font-semibold"
      >
        {initialData ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};
