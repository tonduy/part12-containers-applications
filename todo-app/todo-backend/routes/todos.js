const express = require('express');
const { Todo } = require('../mongo')
const redis = require("../redis");
const router = express.Router();

const initializeCounter = async () => {
  let currentCounter = await redis.getAsync('counter');

  if (isNaN(currentCounter) || currentCounter === null) {
    currentCounter = 0;
    await redis.setAsync('counter', currentCounter);
  }
};

initializeCounter().catch(error => {
  console.error('Error initializing counter in Redis:', error);
});

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  let currentCounter = await redis.getAsync('counter');

  if (currentCounter === null || isNaN(currentCounter)) {
    const totalTodos = await Todo.countDocuments({});
    currentCounter = totalTodos;
  }

  const newCounter = parseInt(currentCounter) + 1;

  await redis.setAsync('counter', newCounter);
  res.send(todo);
});

/* GET statistics */
router.get('/statistics', async (_, res) => {
  // Retrieve the counter value from Redis
  const counter = await redis.getAsync('counter');

  // Prepare the JSON response with the counter value
  const statistics = {
    added_todos: counter,
  };

  res.json(statistics);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text;
  req.todo.done = req.body.done;
  await req.todo.save();
  res.send(req.todo);
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
