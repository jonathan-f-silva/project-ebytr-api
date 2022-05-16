import cors from 'cors';
import express, { Router } from 'express';

import connectToDatabase from './db/connection';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  public startServer(): void {
    connectToDatabase().then(() => {
      this.app.listen(
        8080,
        () => console.log(
          'Backend running on port 8080.',
        ),
      );
    });
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
