"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBase64 = exports.toBase64 = void 0;
const toBase64 = (id) => {
    const buffer = new Buffer(id);
    return buffer.toString("base64");
};
exports.toBase64 = toBase64;
const fromBase64 = (data) => {
    let buffer = new Buffer(data, "base64");
    return buffer.toString("ascii");
};
exports.fromBase64 = fromBase64;
//# sourceMappingURL=base64.js.map