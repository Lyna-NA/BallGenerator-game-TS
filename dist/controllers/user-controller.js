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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const UserController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield User_1.default.findAll();
            res.status(200).json({ status: true, data: response });
        }
        catch (error) {
            res.status(500).json({ status: false, message: "Server Error" });
        }
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield User_1.default.findByPk(req.params.id);
            if (!response)
                throw new Error();
            res.status(200).json({ status: true, data: response });
        }
        catch (error) {
            res
                .status(404)
                .json({ status: false, message: "Document not found!" });
        }
    }),
    store: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield User_1.default.create(userData);
        return ({
            status: true,
            message: "Success",
            data: result,
        });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield User_1.default.update({
                name: req.body.name,
                email: req.body.email,
            }, { where: { id: req.params.id } });
            if (result[0] === 0)
                throw new Error();
            res.status(200).json({ status: true, message: "Success" });
        }
        catch (error) {
            res
                .status(404)
                .json({ status: false, message: "Failed, Document not found" });
        }
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield User_1.default.destroy({ where: { id: req.params.id } });
            const isDeleted = result === 1;
            res.status(isDeleted ? 204 : 404).json({
                status: isDeleted,
                message: isDeleted ? "Success" : "Not found",
            });
        }
        catch (error) {
            res
                .status(404)
                .json({ status: false, message: "Failed, Document not found" });
        }
    }),
};
exports.default = UserController;
