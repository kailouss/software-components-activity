import { Request, Response } from "express";
import { Employee } from "../models/employeeModel.js";

let employees: Employee[] = [];

export const getEmployees = (req: Request, res: Response) => {
  res.json(employees);
};

export const getEmployee = (req: Request, res: Response) => {
  const employee = employees.find((e) => e.id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
};

export const createEmployee = (req: Request, res: Response) => {
  const employee: Employee = { ...req.body, id: Date.now().toString() };
  employees.push(employee);
  res.status(201).json(employee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const index = employees.findIndex((e) => e.id === req.params.id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).send("Employee not found");
  }
};

export const deleteEmployee = (req: Request, res: Response) => {
  employees = employees.filter((e) => e.id !== req.params.id);
  res.status(204).send();
};
