const { StatusCodes } = require('http-status-codes');

const { TaskRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const taskRepository = new TaskRepository();

async function createTask(data) {
  try {
    const task = await taskRepository.create(data);
    return task;
  } catch (error) {
    if (error.name == 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new task', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getTasks(filter) {
  try {
    const tasks = await taskRepository.getAll(filter);
    return tasks;
  } catch (error) {
    throw new AppError('Cannot fetch all the requested tasks', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateTask(id, data) {
  try {
    const response = await taskRepository.update(id, data);
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask
}

