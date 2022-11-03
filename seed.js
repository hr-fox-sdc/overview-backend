const fs = require('fs');
const connectionClient = require('./overview-backend-server/connect.js');


const initialize = fs.readFileSync('./database.sql').toString();

connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query(initialize, (err, result) => {
    if (err) {
      return console.error('Error executing query while initializing', err.stack);
    }
    console.log('initialized tables')
  });
});