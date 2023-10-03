const express = require('express');

const { TaskMiddlewares } = require('../../middlewares');
const { TaskController } = require('../../controllers');

const router = express.Router();

router
  .get('/', TaskController.getTasks)
  .post('/', TaskMiddlewares.validateCreateRequest, TaskController.createTask)
  .patch('/', TaskMiddlewares.validatePatchRequest, TaskController.patchTask);

module.exports = router;