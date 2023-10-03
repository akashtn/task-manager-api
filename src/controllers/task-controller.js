const { Op } = require("sequelize");
const moment = require('moment');

const Task = require('../models/task');
const { TaskService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require("http-status-codes");

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

const getMonthPadded = (month) => {
  return month.length === 1 ? '0' + month : month;
}

const getTasks = async (req, res, next) => {
  try {
    const { year, month } = req.query;

    const filter = {};
    if (month && year) {
      const monthPadded = getMonthPadded(month);
      filter.createdAt = {
        [Op.gt]: moment(new Date(`${year}-${monthPadded}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc(),
        [Op.lt]: moment(new Date(`${year}-${Number(monthPadded) + 1}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc()
      }
    }

    const tasks = await TaskService.getTasks(filter);

    let open_tasks = 0, inprogress_tasks = 0, completed_tasks = 0;
    tasks.forEach(task => {
      if (task.status === 'open') {
        open_tasks++;
      } else if (task.status === 'in-progress') {
        inprogress_tasks++;
      } else {
        completed_tasks++;
      }
    });
    const response = {
      date: `${monthsArr[Number(month) - 1]} ${year}`,
      metrics: {
        open_tasks,
        inprogress_tasks,
        completed_tasks,
      }
    }
    SuccessResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

const createTask = async (req, res, next) => {
  try {
    const { description, status, createdAt } = req.body;
    const task = await TaskService.createTask({
      description,
      status: status || "open",
      createdAt
    })
    SuccessResponse.data = task;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

const patchTask = async (req, res, next) => {
  try {
    const { id, description, status } = req.body;

    const updatedTask = {};
    if (description) updatedTask.description = description;
    if (status) updatedTask.status = status;
    const response = await TaskService.updateTask(id, updatedTask);
    SuccessResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}


module.exports = {
  getTasks,
  createTask,
  patchTask
}