# chat-backend-scheduler

This is the simple node.js backend part of the Xet Project, prepared to register xets and messages in database using sequelize.

## Running
You must have an `npm` installed and an database running on 3306, currently I have only tested with mysql. 
After this, set these environment variables:

`DB_NAME`: Database name;

`DB_HOST`: Database hostname;

`DB_USER`: Database username;

`DB_PASSWORD`: Database password;

`PORT`: Port where application will serve.

All ready, then run:

```
  npm install
  npm start
```
