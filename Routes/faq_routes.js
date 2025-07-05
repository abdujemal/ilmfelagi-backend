import Express from "express"
import { getFaq } from "../controller/faq-controller.js"

const router = Express.Router()

router.get("/", getFaq)

export default router