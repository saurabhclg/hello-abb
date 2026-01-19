// ...existing code...
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello ABB');
});

// Liveness and readiness endpoints for Kubernetes probes
app.get('/health/liveness', (req, res) => {
  // simple liveness: if the process is running, return 200
  res.status(200).json({ status: 'alive' });
});

app.get('/health/readiness', (req, res) => {
  // simple readiness: return 200 when the app is ready to serve traffic
  // adjust logic here if you need to check DB, queues, caches, etc.
  res.status(200).json({ status: 'ready' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log(`Liveness probe: http://localhost:${port}/health/liveness`);
    console.log(`Readiness probe: http://localhost:${port}/health/readiness`);
  });
}

module.exports = app;
// // ...existing code...
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello ABB');
// });

// // Only start the server if this file is run directly
// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
//   });
// }

// module.exports = app;