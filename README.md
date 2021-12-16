# chat-backend-scheduler

This is the simple node.js backend part of the Xet Project, prepared to register xets and messages in database using sequelize.

## Running

First of all you must set these environment variables:

`DB_NAME`: Database name;

`DB_HOST`: Database hostname;

`DB_USER`: Database username;

`DB_PASSWORD`: Database password;

`PORT`: Port where application will serve.

After this, you also must have an database running, currently I have only tested with mysql. With the database ready run the hypercomplex:

```
  npm start
```
