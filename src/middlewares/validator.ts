import { check } from 'express-validator';

const createTask = [
    check('task').notEmpty()];
const deleteTask = [
    check('id').notEmpty()
];

export default { createTask, deleteTask };
