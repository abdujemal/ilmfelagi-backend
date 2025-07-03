import Express from 'express'
import { getCategories } from "../controller/category_controller.js"

var router = Express.Router()

router.get("/", getCategories)


export default router