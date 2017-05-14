const App = require('./app');
const port = process.env.PORT || 3005;

App.create().listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
