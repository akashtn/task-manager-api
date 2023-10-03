const express = require('express');

const { ServerConfig } = require('./config');
const sequelize = require('./utils/common/database');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

sequelize
  .sync(
  // { force: true }
)
  .then((res) => {
    app.listen(ServerConfig.PORT, () => {
      console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  })
