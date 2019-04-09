import { Application, Request, Response } from 'express';
import path from 'path';

export default class HomeController {
  public constructor(app: Application) {
    app.get('/api/', this.ping);
    app.get('/', this.serveReact);
  }

  /**
   * @route GET /api/
   * @desc Pings the API.
   * @access Public
   */
  private ping(req: Request, res: Response) {
    res.send(`API is running ${Date.now()}`);
  }

  /**
   * @route GET /
   * @desc Serves the Client React App.
   * @access Public
   */
  private serveReact(req: Request, res: Response) {
    res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
  }
}
