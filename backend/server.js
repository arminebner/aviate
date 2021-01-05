const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

//middleware
app.use(express.json())

//database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
 .then(() => console.log(`connection to Mongo DB @ ${process.env.MONGO_URI} established`))
 .catch(err => console.log(err))

const port = 5000

app.listen(port, () => console.log(`Server running on port ${port}`))