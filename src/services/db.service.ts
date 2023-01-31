import config from "../configs/general.config";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTask(page?: number, task_id?: number) : Promise<Task[]> {
    const conf = {
        ...(page && { skip : (page - 1) * config.listPerPage }),
        ...(page && { take : config.listPerPage }),
        where: {
            ...(task_id && { id: task_id })
        }
    }
    return await prisma.task.findMany(conf);
}


async function attachTask(task_id:number, task_ids: number[]) {
    try {
        return await prisma.task.update({
        where: {
            id: task_id
        },
        data: {
            attaching: {
                connect: task_ids.map(id => ({id}))
            }
        }});
    }
    catch (error) {
        return Promise.reject(error);
    }
}
async function createTask(task: Task, user_id: number) {
    return await prisma.task.create({
        data: {
            ...task,
            author: { connect: { id: user_id } }
        }
    });

}

async function deleteTask(task_id: number) {
    return await prisma.task.delete({
        where: {
            id: task_id
        }
    });
}

async function getUsers(): Promise<User[]> {
    return await prisma.author.findMany();
}


export default { getTask, createTask, deleteTask, getUsers, attachTask};
