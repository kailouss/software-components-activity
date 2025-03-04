import { Express } from "express";
import { getEmployees } from "../controllers/employeeDataController";

export const employeeDataRoutes = (app: Express) => {
  app.get("/api/employee-data", getEmployees);
};
