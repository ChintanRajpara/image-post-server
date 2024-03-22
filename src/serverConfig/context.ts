import { Request, Response } from "express";
import { ImageRepository } from "../repository/image/image.repository";

interface iContext {
  _imageRepository: ImageRepository;
}

class ContextRepository {
  private static instance: ContextRepository;

  public _imageRepository: ImageRepository;

  constructor({}: { request: Request; response: Response }) {
    this._imageRepository = ImageRepository.getInstance();
  }

  public static getInstance({
    request,
    response,
  }: {
    request: Request;
    response: Response;
  }): ContextRepository {
    if (!ContextRepository.instance) {
      ContextRepository.instance = new ContextRepository({ request, response });
    }

    return ContextRepository.instance;
  }
}

export { ContextRepository, iContext };
