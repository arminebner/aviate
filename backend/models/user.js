const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user-schema
const UserSchema = new Schema({
  user_name: {
      type: String,
      required: true
  },
  favorite_airplanes: Array, 
  favorite_airports: Array
})

module.exports = mongoose.model('users', UserSchema)