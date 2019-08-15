const env = process.env.NODE_ENV

let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'blogs'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'blogs'
  }
}

module.exports = {
  MYSQL_CONF
}