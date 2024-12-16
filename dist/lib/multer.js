"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uplouder = void 0;
const multer_1 = __importDefault(require("multer"));
const uplouder = (filelimit = 7) => {
    const storage = multer_1.default.memoryStorage();
    const limits = { fileSize: filelimit * 1024 * 1024 };
    return (0, multer_1.default)({ storage, limits });
};
exports.uplouder = uplouder;