import { Router } from 'express'
import * as todoController from '../controller/todo'

const router = Router()

router.get('/getAllTodo', todoController.getAllTodo)
router.get('/getTodo', todoController.getTodo)
router.post('/addTodo', todoController.addTodo)
router.put('/updateTodo', todoController.updateTodo)
router.delete('/deleteTodo', todoController.deleteTodo)

export default router
