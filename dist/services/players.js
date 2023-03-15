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
const Player_1 = __importDefault(require("../models/Player"));
const PlayerController = {
    index: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield Player_1.default.findAll();
            return { status: true, data: response };
        }
        catch (error) {
            return { status: false, data: null };
        }
    }),
    show: (playerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield Player_1.default.findByPk(playerId);
            console.log("Show-From-PlayerService-----", response);
            if (response == null) {
                return { status: false, data: null };
            }
            return { status: true, data: response };
        }
        catch (error) {
            return { status: false, data: null };
        }
    }),
    store: (playerData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let response = yield Player_1.default.create(playerData);
            return { status: true, data: response.dataValues };
        }
        catch (error) {
            return {
                status: true,
                data: null,
            };
        }
    }),
    update: (playerData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const player = yield Player_1.default.findByPk(playerData.playerId);
            if (player == null) {
                return { status: false, data: null };
            }
            const response = yield Player_1.default.update({
                color: playerData.color,
                top: playerData.top,
                left: playerData.left,
            }, { where: { playerId: playerData.playerId } });
            return { status: true, data: response };
        }
        catch (error) {
            return { status: false, data: null };
        }
    }),
    destroy: (playerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Player_1.default.destroy({ where: { playerId: playerId } });
            const isDeleted = result === 1;
            return {
                status: isDeleted,
                data: result,
            };
        }
        catch (error) {
            return { status: false, data: null };
        }
    }),
};
exports.default = PlayerController;
