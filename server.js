'use strict';

const http = require('node:http');
const { calculate } = require('./arithmetic');

const port = Number(process.env.PORT || 3000);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/healthz') {
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('ok\n');
    return;
  }

  if (request.method === 'GET' && url.pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Arithmetic Operations</title></head>
  <body>
    <h1>Arithmetic Operations</h1>
    <p>Use <code>/api/calculate?operation=add&a=10&b=5</code>.</p>
    <ul>
      <li><a href="/api/calculate?operation=add&a=10&b=5">Addition: 10 + 5</a></li>
      <li><a href="/api/calculate?operation=subtract&a=10&b=5">Subtraction: 10 - 5</a></li>
      <li><a href="/api/calculate?operation=multiply&a=10&b=5">Multiplication: 10 * 5</a></li>
      <li><a href="/api/calculate?operation=divide&a=10&b=5">Division: 10 / 5</a></li>
    </ul>
  </body>
</html>`);
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/calculate') {
    const operation = url.searchParams.get('operation');
    const first = Number(url.searchParams.get('a'));
    const second = Number(url.searchParams.get('b'));

    try {
      const result = calculate(operation, first, second);
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ operation, first, second, result }));
    } catch (error) {
      response.writeHead(400, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Arithmetic Operations app listening on port ${port}`);
});
