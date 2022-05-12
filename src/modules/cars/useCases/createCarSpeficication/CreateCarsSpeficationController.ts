import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpeficationUseCase } from "./CreateCarSpeficationUseCase";

class CreateCarSpeficationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpeficationUseCase = container.resolve(CreateCarSpeficationUseCase);

    const cars = await createCarSpeficationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}

export { CreateCarSpeficationController };
