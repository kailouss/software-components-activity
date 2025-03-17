import React from "react";
import { Employee } from "../../types/employee";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <ul className="bg-gray-700 p-4 rounded-lg max-h-60 overflow-auto">
      {employees.map((emp) => (
        <li
          key={emp.id}
          className="border-b border-gray-600 p-2 last:border-none flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-semibold text-white">
              {emp.firstName} {emp.lastName}
            </p>
            <p className="text-sm text-gray-400">{emp.role}</p>
            <p className="text-sm text-gray-400">{emp.groupName}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(emp)}
              className="bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 p-1 px-3 rounded text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(emp.id!)}
              className="bg-red-600 hover:bg-red-700 transition-all active:scale-95 p-1 px-3 rounded text-white font-semibold"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
