import Express from "express"
import { getUstazs } from "../controller/ustaz_controller.js";

const router = Express.Router()

router.get("/", getUstazs)

export default router;