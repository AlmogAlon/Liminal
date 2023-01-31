import db from "../services/db.service";
import helper from "../utils/helper.util";
import slackService from "./slack.service";


async function get(task_id: number) {
  const rows = await db.getTask(null, task_id);
  const data = helper.emptyOrRows(rows);
  return {data}
}


async function getMultiple(page: number) {
  const rows = await db.getTask(page);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

const create = async (task: Task, user_id?: number, attach?: Attach) => {
  if (!user_id) {
    const users: User[]= await db.getUsers(); 
    if (users.length > 0){
      user_id = users[0].id
    }
    else {
      return { "message": "No users available" }
    }
  }
  try {
    await db.createTask(task, user_id).then(async (task) => {
      if (attach) {
        await db.attachTask(task.id, attach.ids)
      }
    })
  } 
  catch (err) {
    console.error(`Error while creating tasks`, err.message);
    return { "message": err.message }
  }
  slackService.sendMessage(`New task created: ${task.title}`)
  return { "message": "task created successfully" }

}

const remove = async (id: number) =>{
  try {
    const task = await db.deleteTask(id);
    if (task) {
      slackService.sendMessage(`Task deleted: ${task.title}`)
      return {'message': 'task deleted successfully', task}
    }
    return {'message': 'error'};
  }
  catch (err) {
    console.error(`Error while deleting tasks`, err.message);
    return { "message": err.message }
  }
}

export default { get, getMultiple, create, remove };
