const express = require('express');
const Prometheus = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Prometheus metrics initialization
const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Custom metrics
const crudCounter = new Prometheus.Counter({
  name: 'crud_operations_total',
  help: 'Total number of CRUD operations',
  labelNames: ['operation', 'status_code', 'path'],
});


app.use(express.json());



// Get all items
app.get('/items', (req, res) => {
  let statusCode = 200;
  crudCounter.inc({ path: req?.originalUrl, method: req?.method, status_code: statusCode });
  res.status(stausCode).json('all items');
  // crudCounter.inc({ operation: 'read', status_code: res.statusCode, path: req.path });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(await Prometheus.register.metrics());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
