const argv = require('yargs').argv

const APP = {
  PORT: 3999,
  ROOT_PATH:'/api'
}
const MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/vue_blog`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
}

module.exports = {
  MONGODB,
  APP
}

