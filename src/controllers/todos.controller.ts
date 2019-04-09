import { Application, Request, Response } from 'express';
import { TodoModel } from './../models/Todo';
import { authorize } from '../middleware/authHandler';

export default class TodosController {
  public constructor(app: Application) {
    app.post('/api/todos', authorize, this.createTodo);
    app.get('/api/todos', authorize, this.getTodos);
    app.put('/api/todos/:id', authorize, this.updateTodo);
    app.delete('/api/todos/:id', authorize, this.deleteTodo);
  }

  /**
   * @route POST /api/todos
   * @desc Creates a new Todo.
   * @access Private
   */
  private async createTodo(req: Request, res: Response) {
    const { name } = req.body;
    if (name == undefined || !name.trim().length) {
      return res.status(400).json({ error: 'Todo must have a name.' });
    }

    req.user.todos.push(new TodoModel({ name }));
    await req.user.save();

    res.status(201).json(req.user.todos);
  }

  /**
   * @route GET /api/todos
   * @desc Get All Todos of a user.
   * @access Private
   */
  private async getTodos(req: Request, res: Response) {
    res.json(req.user.todos);
  }

  /**
   * @route PUT /api/todos/:id
   * @desc Update a Todo State.
   * @access Private
   */
  private async updateTodo(req: Request, res: Response) {
    const todoID = req.params.id;
    const { state } = req.body;
    if (state == undefined) {
      return res.status(400).json({ error: 'Todo state should not be empty.' });
    }

    req.user.todos.forEach((todo: any) => {
      if (todo._id == todoID) {
        todo.isDone = state;
      }
    });
    await req.user.save();

    res.json(req.user.todos);
  }

  /**
   * @route DELETE /api/todos/:id
   * @desc Deletes a Todo.
   * @access Private
   */
  private async deleteTodo(req: Request, res: Response) {
    const todoID = req.params.id;

    req.user.todos = req.user.todos.filter((todo: any) => todo._id != todoID);
    await req.user.save();

    res.json(req.user.todos);
  }
}
