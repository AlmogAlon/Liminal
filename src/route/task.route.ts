import taskController from "../controllers/task.controller";
import express from 'express';
import validator from "../middlewares/validator";

const router = express.Router();

router.get('/', taskController.get);
router.post('/', validator.createTask, taskController.create);
router.delete('/:id', validator.deleteTask, taskController.remove);
//router.put('/:id', taskController.update);


export default router;