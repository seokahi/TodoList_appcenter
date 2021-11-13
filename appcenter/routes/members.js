const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
    //  res.json(users);
      res.status(201).json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.route('/:id')
.get(async (req, res, next) => {
  try {
      const todos = await Todo.findAll({
          include: {
              model: User,
              where: { id: req.params.id },
          },
      });
      console.log(todos);
      res.json(todos);
  } catch (err) {
      console.error(err);
      next(err);
  }
})
.patch(async (req, res, next) => {
  try {
    const result = await User.update({
      age: req.body.age,
      name: req.body.name
    }, {
      model: User,
      where: { id: req.params.id },
    });
    console.log(result);
    res.status(201).json(result);
    // res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id/todos', async (req, res, next) => {
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
});

module.exports = router;