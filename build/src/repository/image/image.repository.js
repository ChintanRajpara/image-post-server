"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepository = void 0;
const tslib_1 = require("tslib");
// import { toObjectId, toBase64, fromBase64 } from "../../common/mongoose";
// import { fromGlobalId } from "graphql-relay";
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const base64_1 = require("../../common/base64");
const createUID_1 = require("../../common/createUID");
const https_1 = tslib_1.__importDefault(require("https"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class ImageRepository {
    static instance;
    images;
    async saveFileFromUrl({ url }) {
        const fileId = (0, createUID_1.createUID)();
        const fileName = fileId;
        const file = fs_1.default.createWriteStream(`./public/${fileName}`);
        await new Promise((resolve) => {
            https_1.default.get(url, function (response) {
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
            fs_1.default.rmSync("./public", { recursive: true });
        }
        catch (error) { }
        try {
            fs_1.default.mkdirSync("./public");
        }
        catch (error) { }
        for (let index = 0; index < dummyImages.length; index++) {
            const image = dummyImages[index];
            const id = (0, createUID_1.createUID)();
            const fileName = await this.saveFileFromUrl({ url: image.url });
            this.images.push({ ...image, id, fileName });
        }
    }
    constructor() {
        this.loadImages();
        this.images = [];
    }
    convertImageToEdge(image) {
        const { id, isFavourite, title, fileName } = image;
        return {
            node: { id, isFavourite, title, fileName },
            cursor: (0, base64_1.toBase64)(id),
        };
    }
    async getImages({}) {
        const edges = this.images.map((image) => this.convertImageToEdge(image));
        const firstEdge = lodash_1.default.head(edges);
        const lastEdge = lodash_1.default.last(edges);
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
    async createImage({ url, title }) {
        const fileName = await this.saveFileFromUrl({ url });
        const image = { fileName, title, id: (0, createUID_1.createUID)(), isFavourite: false };
        this.images.push(image);
        return {
            success: true,
            image: this.convertImageToEdge(image),
            message: "Image posted successfully!",
        };
    }
    async updateImage({ imageId, title, isFavourite, }) {
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
    async deleteImage({ imageId }) {
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
    static getInstance() {
        if (!ImageRepository.instance) {
            ImageRepository.instance = new ImageRepository();
        }
        return ImageRepository.instance;
    }
}
exports.ImageRepository = ImageRepository;
ImageRepository.getInstance();
//# sourceMappingURL=image.repository.js.map