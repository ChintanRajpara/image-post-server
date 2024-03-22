"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextRepository = void 0;
const image_repository_1 = require("../repository/image/image.repository");
class ContextRepository {
    static instance;
    _imageRepository;
    constructor({}) {
        this._imageRepository = image_repository_1.ImageRepository.getInstance();
    }
    static getInstance({ request, response, }) {
        if (!ContextRepository.instance) {
            ContextRepository.instance = new ContextRepository({ request, response });
        }
        return ContextRepository.instance;
    }
}
exports.ContextRepository = ContextRepository;
//# sourceMappingURL=context.js.map