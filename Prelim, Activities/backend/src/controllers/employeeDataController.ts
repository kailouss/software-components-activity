import { Request, Response } from "express";

interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
}

const employees: Employee[] = [
  { id: "1", name: "Pol", role: "Software Engineer", salary: 50000 },
  { id: "2", name: "FloydTz", role: "Product Manager", salary: 45000 },
  { id: "3", name: "Ddemizer", role: "Designer", salary: 30000 },
  { id: "4", name: "Shun", role: "Data Analyst", salary: 70000 },
  { id: "5", name: "Maisio", role: "DevOps Engineer", salary: 80000 },
];

export const getEmployees = (req: Request, res: Response) => {
  res.json(employees);
};
