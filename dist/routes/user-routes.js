"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const router = express_1.default.Router();
/**
 * @method GET
 * @controllerMethod index
 */
router.get("/", user_controller_1.default.index);
/**
 * @method GET
 * @param :id
 * @controllerMethod show
 */
router.get("/:id", user_controller_1.default.show);
/**
 * @method POST
 * @controllerMethod store
 */
router.post("/", user_controller_1.default.store);
/**
 * @method PUT
 * @param :id
 * @controllerMethod update
 */
router.put("/:id", user_controller_1.default.update);
exports.default = router;
