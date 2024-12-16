"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const prisma_1 = require("../../lib/prisma");
const argon_1 = require("../../lib/argon");
const registerService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = body;
        const existingUser = yield prisma_1.prisma.user.findFirst({
            where: { email },
        });
        if (existingUser) {
            throw new Error("Email or Username already exist!");
        }
        const hashedPassword = yield (0, argon_1.hashPassword)(password);
        return yield prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.registerService = registerService;
