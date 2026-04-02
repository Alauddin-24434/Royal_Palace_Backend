import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { authorizeRoles } from "../middleware/authorizeRoles";
import upload from "../middleware/uploadMiddleware";
import { amenitieController } from "../controllers/amenitie.contollers";

const router = Router();


router.get("/", amenitieController.getAllAmenities);
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  upload.single("image"),
  amenitieController.createAmenitie
);
router.patch(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  upload.single("image"),
  amenitieController.updateAmenitie
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  amenitieController.deleteAmenitie
);

export const serviceRoute = router;
