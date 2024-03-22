// import { toObjectId, toBase64, fromBase64 } from "../../common/mongoose";
// import { fromGlobalId } from "graphql-relay";
import _ from "lodash";

import { toBase64 } from "../../common/base64";
import { createUID } from "../../common/createUID";
import https from "https";
import fs from "fs";

type ImageType = {
  id: string;
  title: string;
  fileName: string;
  isFavourite: boolean;
};

class ImageRepository {
  private static instance: ImageRepository;
  private images: ImageType[];

  async saveFileFromUrl({ url }: { url: string }) {
    const fileId = createUID();

    const fileName = fileId;

    const file = fs.createWriteStream(`./public/${fileName}`);

    await new Promise((resolve) => {
      https.get(url, function (response) {
        response.pipe(file);

        file.on("finish", () => {
          file.close();

          resolve(undefined);
        });
      });
    });

    return fileName;
  }

  async loadImages() {
    const dummyImages = [
      {
        title: "Nature #1",
        url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: false,
      },
      {
        title: "Nature #2",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: true,
      },
      {
        title: "Nature #3",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=6074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: false,
      },
      {
        title: "Nature #4",
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=5616&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: true,
      },
    ];

    try {
      fs.rmSync("./public", { recursive: true });
    } catch (error) {}

    try {
      fs.mkdirSync("./public");
    } catch (error) {}

    for (let index = 0; index < dummyImages.length; index++) {
      const image = dummyImages[index];
      const id = createUID();

      const fileName = await this.saveFileFromUrl({ url: image.url });

      this.images.push({ ...image, id, fileName });
    }
  }

  constructor() {
    this.loadImages();

    this.images = [];
  }

  convertImageToEdge(image: ImageType) {
    const { id, isFavourite, title, fileName } = image;

    return {
      node: { id, isFavourite, title, fileName },
      cursor: toBase64(id),
    };
  }

  async getImages({}: { first: number; after: string }) {
    const edges = this.images.map((image) => this.convertImageToEdge(image));

    const firstEdge = _.head(edges);
    const lastEdge = _.last(edges);

    return {
      edges,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: firstEdge?.cursor || null,
        endCursor: lastEdge?.cursor || null,
      },
    };
  }

  async createImage({ url, title }: { url: string; title: string }) {
    const fileName = await this.saveFileFromUrl({ url });

    const image = { fileName, title, id: createUID(), isFavourite: false };

    this.images.push(image);

    return {
      success: true,
      image: this.convertImageToEdge(image),
      message: "Image posted successfully!",
    };
  }

  async updateImage({
    imageId,
    title,
    isFavourite,
  }: {
    imageId: string;
    title?: string;
    isFavourite?: boolean;
  }) {
    const imageIndex = this.images.findIndex(({ id }) => id === imageId);

    if (imageIndex === -1) {
      return { success: false, image: null, message: "Image not found!" };
    }

    const image = this.images[imageIndex];

    if (title) {
      image.title = title;
    }

    if (typeof isFavourite === "boolean") {
      image.isFavourite = isFavourite;
    }

    this.images[imageIndex] = image;

    return {
      success: true,
      image: this.convertImageToEdge(image),
      message: "",
    };
  }

  async deleteImage({ imageId }: { imageId: string }) {
    const imageIndex = this.images.findIndex(({ id }) => id === imageId);

    if (imageIndex === -1) {
      return { success: false, image: null, message: "Image not found!" };
    }

    const image = this.images[imageIndex];

    this.images.splice(imageIndex, 1);

    return {
      success: true,
      image: this.convertImageToEdge(image),
      message: "Image deleted successfully!",
    };
  }

  public static getInstance(): ImageRepository {
    if (!ImageRepository.instance) {
      ImageRepository.instance = new ImageRepository();
    }
    return ImageRepository.instance;
  }
}

ImageRepository.getInstance();

export { ImageRepository };
