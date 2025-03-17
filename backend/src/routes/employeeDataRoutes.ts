import { Express } from "express";
import { getEmployees } from "../controllers/employeeDataController.js";

export const employeeDataRoutes = (app: Express) => {
  app.get("/api/employee-data", getEmployees);
};
