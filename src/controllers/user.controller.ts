
import userService from  "../services/user.service";
import { validationResult } from "express-validator";


async function get(req, res, next) {
  try {
    res.json(await userService.get());
  } catch (err) {
    console.error(`Error while getting tasks`, err.message);
    next(err);
  }
}

export default { get };
