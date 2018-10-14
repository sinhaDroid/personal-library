require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(
    () => console.info('db connected'),
    err => console.warn('db connection failed')
  );

const app = express();
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

app.use(bodyParser.json());

require('./routes/routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.info(`Server listening on port ${PORT}.`));

module.exports = app;
