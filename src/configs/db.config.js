require('dotenv').config()
const env = process.env;
const db = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME || 'task_manager',
  port: env.DB_PORT || 3306,
  /* ssl: {
     mode: 'VERIFY_IDENTITY',
     ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
   }*/
};

module.exports = db;