/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import app from './src/app';

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port, () => {
  process.stdout.write(`Point your browser to: http://localhost:${port}\n`);
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
