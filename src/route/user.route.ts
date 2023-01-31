import userController from "../controllers/user.controller";
import express from 'express';
import validator from "../middlewares/validator";

const router = express.Router();

router.get('/', userController.get);
//router.post('/', validator.createUser, userController.create);

export default router;