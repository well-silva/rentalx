import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryImMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpeficationUseCase } from "./CreateCarSpeficationUseCase";

let createCarSpeficationUseCase: CreateCarSpeficationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpeficationUseCase = new CreateCarSpeficationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "123";

      const specifications_id = ["5633"];

      await createCarSpeficationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Description test",
      daily_rate: 100,
      license_plate: "ABD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Test",
      description: "Test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpeficationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
