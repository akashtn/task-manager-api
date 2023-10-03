const CrudRepository = require('./crud-repository');
const Task = require('../models/task');


class TaskRepository extends CrudRepository {
  constructor() {
    super(Task);
  }
}

module.exports = TaskRepository;