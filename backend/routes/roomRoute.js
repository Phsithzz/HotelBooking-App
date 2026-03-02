import express from "express"
import * as roomController from "../controllers/roomController.js"

const router = express.Router()

router.post("/room/create",roomController.createRoom)
router.get("/room/list",roomController.getAllRoom)
router.get("/room/:roomId",roomController.getOneRoom)
router.delete("/room/remove/:id",roomController.removeRoom)
router.put("/room/:id", roomController.updateRoom)

export default router