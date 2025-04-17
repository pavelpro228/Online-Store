const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://buylin399pavel:buylin399pavelpassword@cluster.oaz1poy.mongodb.net/OnlineStore?appName=Cluster"
    )
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB