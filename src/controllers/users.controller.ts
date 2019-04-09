import { Application, Request, Response } from 'express';
import { UserModel } from '../models/User';

export default class UsersController {
  public constructor(app: Application) {
    app.post('/api/users/login', this.loginUser);
    app.post('/api/users/register', this.registerUser);
  }

  /**
   * @route POST /api/users/login
   * @desc Login User.
   * @access Public
   */
  private async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validating input
    if (
      email == undefined ||
      password == undefined ||
      !email.trim().length ||
      !password.trim().length
    ) {
      return res.status(400).json({ error: 'Invalid Email or Password' });
    }

    // Checking user existence
    const user = await UserModel.findOne({ email });

    if (user == undefined) {
      return res.status(400).json({ error: 'Invalid Email or Password' });
    }

    // Validating Password
    if ((await user.isMatchingPassword(password)) === false) {
      return res.status(400).json({ error: 'Invalid Email or Password' });
    }

    res.json({ token: user.generateAuthToken() });
  }

  /**
   * @route POST /api/users/register
   * @desc Creates new user.
   * @access Public
   */
  private async registerUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validating input
    if (
      email == undefined ||
      password == undefined ||
      !email.trim().length ||
      !password.trim().length
    ) {
      return res.status(400).json({ error: 'Invalid Input' });
    }

    // Checking user existence
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    let newUser = new UserModel({ email, password });
    newUser.password = await newUser.hashPassword(password);
    newUser = await newUser.save();

    res.status(201).json({ id: newUser._id });
  }
}
