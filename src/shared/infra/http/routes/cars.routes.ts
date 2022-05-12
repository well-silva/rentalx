import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpeficationController } from "@modules/cars/useCases/createCarSpeficication/CreateCarsSpeficationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http//middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpeficationController = new CreateCarSpeficationController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpeficationController.handle
);

export { carsRoutes };
