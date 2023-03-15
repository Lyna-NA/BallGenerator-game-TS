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
const players_1 = __importDefault(require("../services/players"));
const PlayerController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield players_1.default.index();
        if (response.status) {
            res
                .status(200)
                .json({
                status: true,
                message: "Data Retrieved Successfully",
                data: response.data,
            });
        }
        else {
            res
                .status(500)
                .json({ status: false, message: "Error Retrieving Data!", data: null });
        }
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield players_1.default.show(req.params.id);
        if (response.status) {
            res
                .status(200)
                .json({ status: true, message: "Success", data: response.data });
        }
        else {
            res
                .status(404)
                .json({ status: false, message: "Document not found!", data: null });
        }
    }),
    store: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("---------Store-Controller-----------");
        const Player = {
            playerId: req.body.playerId,
            color: req.body.color,
            top: req.body.top,
            left: req.body.left,
        };
        const response = yield players_1.default.store(Player);
        if (response.status) {
            res
                .status(201)
                .json({
                status: true,
                message: "Player Created Successfully",
                data: response.data,
            });
        }
        else {
            res
                .status(404)
                .json({
                status: false,
                message: "Error Creating New Player!",
                data: null,
            });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPlayer = {
            playerId: req.params.id,
            color: req.body.color,
            top: req.body.top,
            left: req.body.left,
        };
        const response = yield players_1.default.update(updatedPlayer);
        if (response.status) {
            res
                .status(200)
                .json({
                status: true,
                message: "Player Updated Successfully",
                data: response.data,
            });
        }
        else {
            res
                .status(400)
                .json({ status: false, message: "Error Updating Player!", data: null });
        }
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield players_1.default.destroy(req.params.id);
        if (response.status) {
            res
                .status(200)
                .json({
                status: true,
                message: "Player deleted Successfully",
                data: response.data,
            });
        }
        else {
            res
                .status(404)
                .json({ status: false, message: "Error Deleting Player!", data: null });
        }
    }),
};
exports.default = PlayerController;
