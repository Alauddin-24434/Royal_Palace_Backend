import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { authorizeRoles } from "../middleware/authorizeRoles";
import upload from "../middleware/uploadMiddleware";
import { roomController } from "../controllers/room.controllers";

const router = Router();


/* ================= ROUTES ================= */
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "receptionist", "guest"),
  upload.array("images", 5),
  roomController.createRoom
);

router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);

router.patch(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "receptionist"),
  roomController.updateRoom
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "receptionist"),
  roomController.deleteRoom
);

export const roomRoute = router;
