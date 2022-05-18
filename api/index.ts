import app from './src/app';
import connectToDatabase from './src/db/connection';

connectToDatabase().then(() => {
  app.listen(
    3001,
    () => console.log(
      'Api running on port 3001.',
    ),
  );
});
