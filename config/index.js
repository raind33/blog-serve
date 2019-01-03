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
const USER = {
  jwtTokenSecret: argv.auth_key || 'vue_blog',
  defaultUsername: argv.auth_default_username || 'rain',
	defaultPassword: argv.auth_default_password || '123456'
}

module.exports = {
  MONGODB,
  APP,
  USER
}

