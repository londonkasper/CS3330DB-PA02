// Update with your config settings.

module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'test',
        insecureAuth: true,
        database : 'parking_db'
      }
    }
  };