import app from './app.js';

import 'dotenv/config';

console.log(process.env.APP_NAME);

app.listen(3333, () => {
  console.log('listening on port 3333');
});