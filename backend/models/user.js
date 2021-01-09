const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user-schema
const UserSchema = new Schema({
  user_name: {
      type: String,
      required: true
  },
  favorite_airplanes: {
      type: Array
  },
  favorite_airports: {
      type: Array
  },
})

module.exports = mongoose.model('users', UserSchema)