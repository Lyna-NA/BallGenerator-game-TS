import express from "express";
import PlayerController from "../controllers/player-controller";

const router = express.Router();

/**
 * @method GET
 * @controllerMethod index
 */
router.get("/", PlayerController.index);

/**
 * @method GET
 * @param :id
 * @controllerMethod show
 */
router.get("/:id", PlayerController.show);

/**
 * @method POST
 * @controllerMethod store
 */
router.post("/", PlayerController.store);

/**
 * @method PUT
 * @param :id
 * @controllerMethod update
 */
router.put("/:id", PlayerController.update);

/**
 * @method DELETE
 * @param :id
 * @controllerMethod destroy
 */
router.delete("/:id", PlayerController.destroy);

export default router;