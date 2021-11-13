const express = require('express');
const { Todo } = require('../models');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const todolist = await Todo.create({
      todolistuser: req.body.id,
      todolist: req.body.todolist,
      completed: req.body.completed,
    });
    console.log(todolist);
    res.status(201).json(todolist);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
.get(async (req, res, next) => {
try {
  const todolist = await Todo.findAll({
    include: {
      model: User,
      where: { id: req.params.id },
    },
  });
  console.log(todolist);
  res.status(201).json(todolist);
} catch (err) {
  console.error(err);
  next(err);
}
})
.patch(async (req, res, next) => {
    try {
      const result = await Todo.update({
        completed: req.body.completed,
      }, {
        where: { id: req.params.id },
      });
      //res.json(result);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Todo.destroy({ where: { id: req.params.id } });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;