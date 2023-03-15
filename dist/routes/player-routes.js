"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_controller_1 = __importDefault(require("../controllers/player-controller"));
const router = express_1.default.Router();
/**
 * @method GET
 * @controllerMethod index
 */
router.get("/", player_controller_1.default.index);
/**
 * @method GET
 * @param :id
 * @controllerMethod show
 */
router.get("/:id", player_controller_1.default.show);
/**
 * @method POST
 * @controllerMethod store
 */
router.post("/", player_controller_1.default.store);
/**
 * @method PUT
 * @param :id
 * @controllerMethod update
 */
router.put("/:id", player_controller_1.default.update);
/**
 * @method DELETE
 * @param :id
 * @controllerMethod destroy
 */
router.delete("/:id", player_controller_1.default.destroy);
exports.default = router;
