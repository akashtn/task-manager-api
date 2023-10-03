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

/**
 * GET : /tasks
 * req-body {}
 * query parameters : year, month
 * Ex: /tasks?year=2023&month=10  /tasks?year=2022
 */
const getTasks = async (req, res, next) => {
  try {
    const { year, month } = req.query;

    let responseDate;
    const filter = {};
    if (year && month) {
      const monthPadded = getMonthPadded(month);
      if (month < 12) {
        filter.createdAt = {
          [Op.gte]: moment(new Date(`${year}-${monthPadded}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc(),
          [Op.lt]: moment(new Date(`${year}-${Number(monthPadded) + 1}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc()
        }
      } else {
        filter.createdAt = {
          [Op.gte]: moment(new Date(`${year}-${monthPadded}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc(),
          [Op.lt]: moment(new Date(`${Number(year) + 1}-${1}-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc()
        }
      }
      responseDate = `${monthsArr[Number(month) - 1]} ${year}`
    } else if (year) {
      filter.createdAt = {
        [Op.gte]: moment(new Date(`${year}-1-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc(),
        [Op.lt]: moment(new Date(`${Number(year) + 1}-1-1 00:00:00`), 'MM/DD/YYYY hh:mm:ss').utc()
      }
      responseDate = `${year}`
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
      date: responseDate,
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
    console.log(error)
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}


/**
 * POST : /tasks 
 * req-body {description: 'Attend meeting', status: 'open'}
 */
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


/**
 * PATCH : /airplanes
 * req-body {description: 'new description', status: 'new status'}
 */
const patchTask = async (req, res, next) => {
  try {
    const { id, description, status, createdAt } = req.body;

    const updatedTask = {};
    if (description) updatedTask.description = description;
    if (status) updatedTask.status = status;
    if (createdAt) updatedTask.createdAt = createdAt;
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