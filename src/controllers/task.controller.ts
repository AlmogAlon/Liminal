
import taskService from  "../services/task.service";
import { validationResult } from "express-validator";


async function get(req, res, next) {
  try {
    if (req.query.id) {
      return res.json(await taskService.get(parseInt(req.query.id)));
    }
    res.json(await taskService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting tasks`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }
  const task = req.body.task as Task;
  const attach = req.body.attach as Attach;
  const user_id = req.body.user_id as number;
  try {
    res.json(await taskService.create(task, user_id, attach));
  } catch (err) {
    console.error(`Error while creating tasks`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
 /* try {
    res.json(await taskService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating tasks`, err.message);
    next(err);
  }*/
  return
}

async function remove(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }
  try {
    res.json(await taskService.remove(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while deleting tasks`, err.message);
    next(err);
  }
  return
}

export default { get, create, update, remove };
